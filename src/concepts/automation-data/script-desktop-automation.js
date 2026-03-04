const scriptDesktopAutomation = {
  name: "Script & Desktop Automation",
  icon: "🖥️",
  color: "#6366F1",
  concepts: [
    {
      id: 248,
      name: "Python os & subprocess",
      desc: `**Python \`os\` and \`subprocess\` modules** — the standard library tools for interacting with the operating system, running shell commands, and managing processes from Python scripts.

**\`os\` module — filesystem and environment:**
\`\`\`python
import os

# Environment variables
api_key = os.environ.get('API_KEY')  # None if missing (safe)
home = os.path.expanduser('~')

# Directory operations
os.makedirs('/tmp/output', exist_ok=True)  # Create with parents; no error if exists
files = os.listdir('/data')
os.rename('old.txt', 'new.txt')
os.remove('temp.txt')

# Walk directory tree
for root, dirs, files in os.walk('/data'):
    for file in files:
        print(os.path.join(root, file))
\`\`\`

**\`subprocess\` — running shell commands:**
\`\`\`python
import subprocess

# Simple run — blocks until complete
result = subprocess.run(['git', 'status'], capture_output=True, text=True)
print(result.stdout)
print(result.returncode)  # 0 = success

# Check for failure
result = subprocess.run(['git', 'push'], check=True)  # Raises CalledProcessError on non-zero exit

# Stream output
process = subprocess.Popen(['tail', '-f', 'app.log'],
                           stdout=subprocess.PIPE, text=True)
for line in process.stdout:
    print(line, end='')
\`\`\`

**Security warning:** Never use \`shell=True\` with user-supplied input — this is a command injection vulnerability.
\`\`\`python
# DANGEROUS
subprocess.run(f"grep {user_input} logs.txt", shell=True)
# SAFE
subprocess.run(['grep', user_input, 'logs.txt'])  # List form, no shell
\`\`\`

**Key insight:** Prefer \`subprocess.run()\` (introduced in Python 3.5) over the older \`subprocess.call()\`, \`subprocess.check_output()\`, and \`subprocess.Popen()\` for most use cases. It's the single function designed to cover all common shell execution patterns cleanly.`,
    },
    {
      id: 249,
      name: "Bash Scripting for Automation",
      desc: `**Bash scripting** — writing shell scripts to automate sequences of commands, file operations, and system interactions. The universal automation language for Unix/Linux systems.

**Automation script best practices:**
\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail  # Exit on error, unset vars, pipe failures
# -e: exit on any error
# -u: error on unset variables
# -o pipefail: pipe fails if any command fails

# Logging with timestamps
log() { echo "[\$(date '+%Y-%m-%d %H:%M:%S')] $*" >&2; }

log "Starting backup job"

# Check dependencies
command -v aws >/dev/null 2>&1 || { log "aws CLI not found"; exit 1; }

# Variables with defaults
BACKUP_DIR="\${BACKUP_DIR:-/tmp/backups}"
RETENTION_DAYS="\${RETENTION_DAYS:-7}"

# Create output directory
mkdir -p "$BACKUP_DIR"

# Loop with proper quoting
for file in /data/*.csv; do
    [ -f "$file" ] || continue  # Skip if glob matches nothing
    basename=\$(basename "$file" .csv)
    gzip -c "$file" > "$BACKUP_DIR/\${basename}_\$(date +%Y%m%d).csv.gz"
    log "Backed up: $file"
done

# Cleanup old backups
find "$BACKUP_DIR" -name "*.gz" -mtime "+\${RETENTION_DAYS}" -delete
log "Cleanup complete"
\`\`\`

**Common automation patterns:**
\`\`\`bash
# Check exit status
if ! aws s3 sync /data s3://bucket/; then
    log "S3 sync failed"; exit 1
fi

# Trap for cleanup on exit
cleanup() { rm -rf "$TMPDIR"; }
trap cleanup EXIT

# Run in parallel with wait
for item in "\${items[@]}"; do
    process "$item" &
done
wait  # Wait for all background jobs
\`\`\`

**Key insight:** The three lines \`set -euo pipefail\` at the top of every Bash script prevent silent failures. Without \`-e\`, a command failure is ignored and the script continues with incorrect state. Without \`-u\`, accessing an unset variable evaluates to an empty string, causing subtle bugs. These should be muscle memory.`,
    },
    {
      id: 250,
      name: "File Watchers (watchdog, inotify)",
      desc: `**File watchers** — programs and libraries that monitor the filesystem for changes (file creation, modification, deletion, moves) and trigger callbacks or commands in response.

**Use cases:**
- Auto-restart a development server when source files change
- Process incoming files as they arrive in a directory (upload dropbox, FTP drop folder)
- Trigger a build pipeline when configuration files change
- Sync files to a remote location on save

**Python \`watchdog\` library:**
\`\`\`python
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time

class InvoiceHandler(FileSystemEventHandler):
    def on_created(self, event):
        if not event.is_directory and event.src_path.endswith('.pdf'):
            print(f"New invoice: {event.src_path}")
            process_invoice(event.src_path)

    def on_modified(self, event):
        if event.src_path.endswith('.csv'):
            reload_data(event.src_path)

observer = Observer()
observer.schedule(InvoiceHandler(), path='/data/incoming', recursive=False)
observer.start()

try:
    while True:
        time.sleep(1)
finally:
    observer.stop()
    observer.join()
\`\`\`

**Linux inotify (kernel-level):**
\`\`\`bash
# inotifywait from inotify-tools
inotifywait -m -e close_write /data/incoming/ |
while read dir events file; do
    echo "Processing: $file"
    process_invoice.sh "$dir$file"
done
\`\`\`

**Debouncing:** File save events often fire multiple times in rapid succession (editor writes temp file, then renames). Add a debounce delay: wait 500ms after the last event before triggering processing.

**Cross-platform:** \`watchdog\` uses inotify on Linux, FSEvents on macOS, ReadDirectoryChangesW on Windows — providing a consistent API across platforms.

**Key insight:** File watchers are a simple, effective trigger mechanism for file-based automation. The key operational concern is handling the initial state (files that existed before the watcher started). On startup, scan the directory for unprocessed files before beginning to watch.`,
    },
    {
      id: 251,
      name: "PyAutoGUI (GUI automation)",
      desc: `**PyAutoGUI** — a cross-platform Python library for programmatic control of the mouse and keyboard, enabling automation of any desktop application regardless of whether it exposes an API.

**Core capabilities:**
\`\`\`python
import pyautogui
import time

# Safety feature: move mouse to corner to abort script
pyautogui.FAILSAFE = True  # Move to (0,0) to stop script

# Mouse control
pyautogui.moveTo(500, 400, duration=0.5)  # Move to coordinates
pyautogui.click()  # Left click at current position
pyautogui.click(500, 400)  # Click at specific coordinates
pyautogui.doubleClick(icon_x, icon_y)
pyautogui.rightClick()

# Keyboard control
pyautogui.typewrite('Hello World', interval=0.05)  # Type with delay
pyautogui.hotkey('ctrl', 'c')  # Copy
pyautogui.hotkey('alt', 'tab')  # Switch windows
pyautogui.press('enter')

# Screenshot and image matching
screenshot = pyautogui.screenshot()
button_location = pyautogui.locateOnScreen('submit_button.png', confidence=0.9)
if button_location:
    pyautogui.click(button_location)
\`\`\`

**Image-based automation:** PyAutoGUI can find elements by matching a screenshot image on screen — \`locateOnScreen()\` uses template matching (OpenCV-based when using \`confidence\` parameter). This enables automation of apps with no accessible UI tree.

**Timing challenges:** GUI automation is inherently timing-dependent. Add waits after actions that trigger UI changes:
\`\`\`python
pyautogui.click(open_file_button)
time.sleep(0.5)  # Wait for dialog to open
pyautogui.typewrite('/data/report.csv')
pyautogui.press('enter')
\`\`\`

**When to use PyAutoGUI:** Legacy desktop apps with no API, teaching demonstrations, personal automation scripts, quick-and-dirty prototypes. **When not to:** Production enterprise automation (too fragile) — use RPA tools with proper accessibility APIs instead.

**Key insight:** PyAutoGUI's \`FAILSAFE = True\` is your emergency stop. Move your mouse to the top-left corner (0,0) to terminate the script immediately. Always test scripts with short loops before running at full scale — mouse control errors are difficult to interrupt otherwise.`,
    },
    {
      id: 252,
      name: "AutoHotkey",
      desc: `**AutoHotkey (AHK)** — a Windows scripting language for automating repetitive tasks through hotkeys, macros, GUI interaction, and keyboard/mouse remapping. The power user's desktop automation tool.

**Core mental model:** AHK intercepts keyboard and mouse input, allowing scripts to remap keys, trigger macros on hotkey combinations, type text expansions, and automate Windows GUI interactions. It runs as a background process, always listening.

**Common AHK patterns:**
\`\`\`ahk
; Text expansion — type shortcut, get full text
::sig::John Smith\nProduct Manager\nCompany Inc.

; Hotkey macro — Win+N opens new Notepad
#n::Run Notepad

; Launch and control applications
^!e::  ; Ctrl+Alt+E
    Run, explorer.exe C:\Users\%A_UserName%\Documents
    WinWait, Documents
    WinActivate
Return

; Auto-fill web forms (Chrome/Firefox)
#IfWinActive ahk_exe chrome.exe
^F12::  ; Ctrl+F12 in Chrome
    Click, 400, 200  ; Click name field
    Send, John Smith
    Send, {Tab}
    Send, john@example.com
Return
\`\`\`

**AHK strengths:**
- **Text expansion:** Type abbreviations that expand to full phrases/paragraphs — massive productivity gain for repetitive typing
- **Window management:** Move, resize, tile, and focus windows with hotkeys
- **GUI automation:** Control Windows dialogs, buttons, and input fields via WinAPI
- **No installation in app required:** Works with any Windows application

**AHK limitations:** Windows-only; complex programs become hard to maintain; string handling is quirky; limited standard library. For Linux/macOS equivalents: Automator (macOS), xdotool (Linux).

**Key insight:** AHK's text expansion feature alone justifies installation for any Windows power user. Defining abbreviations for your 20 most frequently typed phrases (email signatures, code snippets, addresses) saves hundreds of keystrokes per day. Start there before exploring more complex automation.`,
    },
    {
      id: 253,
      name: "PowerShell Automation",
      desc: `**PowerShell** — Microsoft's task automation shell and scripting language, built on .NET, that provides deep integration with Windows, Active Directory, Azure, Microsoft 365, and any system with a .NET API or REST API.

**Why PowerShell for automation:**
- **Object pipeline:** Unlike Bash (text-based piping), PowerShell pipes .NET objects. \`Get-Process | Where-Object CPU -gt 50 | Stop-Process\` passes actual process objects — no parsing needed.
- **Windows ecosystem depth:** Native cmdlets for AD, registry, WMI, COM objects, Windows services, event logs, file permissions (ACLs) — access impossible or complex with other tools
- **Cross-platform:** PowerShell 7+ runs on Linux and macOS. Windows-specific cmdlets (Active Directory, registry) remain Windows-only.

**Automation patterns:**
\`\`\`powershell
# Error handling
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'  # Treat all errors as terminating

# File operations
Get-ChildItem -Path C:\Logs -Filter *.log -Recurse |
  Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-30) } |
  Remove-Item

# Active Directory automation
Import-Module ActiveDirectory
New-ADUser -Name "John Smith" -GivenName "John" -Surname "Smith" \`
    -SamAccountName "jsmith" -UserPrincipalName "jsmith@corp.com" \`
    -Enabled $true -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force)

# REST API calls
$response = Invoke-RestMethod -Uri "https://api.github.com/repos/owner/repo/issues" \`
    -Headers @{Authorization = "token $env:GITHUB_TOKEN"}
$response | Select-Object number, title, state | Format-Table

# Scheduled tasks
$action = New-ScheduledTaskAction -Execute 'Powershell.exe' -Argument '-File C:\Scripts\daily-backup.ps1'
$trigger = New-ScheduledTaskTrigger -Daily -At '2:00AM'
Register-ScheduledTask -TaskName 'DailyBackup' -Action $action -Trigger $trigger
\`\`\`

**Key insight:** PowerShell's object pipeline eliminates 90% of text parsing that makes equivalent Bash scripts fragile. \`Get-Process | Sort-Object CPU -Descending | Select-Object -First 5\` returns actual objects with full properties — no awk, no cut, no grep needed.`,
    },
    {
      id: 254,
      name: "Regular Expressions in Automation",
      desc: `**Regular expressions (regex) in automation** — pattern matching and extraction from strings, essential for parsing log files, validating inputs, extracting data from unstructured text, and transforming string formats.

**Automation use cases:**
- Extract IP addresses from log lines
- Validate email addresses before processing
- Parse file timestamps from filenames
- Extract URLs from HTML
- Transform date formats (MM/DD/YYYY → YYYY-MM-DD)
- Identify error patterns in application logs

**Python \`re\` module patterns:**
\`\`\`python
import re

# Extract all IP addresses from log file
log_line = "2024-01-15 ERROR Connection from 192.168.1.100 refused"
ip_pattern = r'\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b'
ips = re.findall(ip_pattern, log_line)

# Named capture groups for readability
log_pattern = r'(?P<date>\\d{4}-\\d{2}-\\d{2}) (?P<level>\\w+) (?P<message>.*)'
match = re.match(log_pattern, log_line)
if match:
    date = match.group('date')
    level = match.group('level')

# Validate before processing
def is_valid_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

# Find and replace with capture groups
# Convert US date format to ISO
text = "Report date: 01/15/2024"
iso_date = re.sub(r'(\\d{2})/(\\d{2})/(\\d{4})', r'\\3-\\1-\\2', text)
# → "Report date: 2024-01-15"

# Compile for repeated use (performance)
ERROR_PATTERN = re.compile(r'ERROR|CRITICAL|FATAL', re.IGNORECASE)
has_error = bool(ERROR_PATTERN.search(log_line))
\`\`\`

**Performance:** \`re.compile()\` caches the compiled pattern object. For patterns used in loops over large datasets, compile once and reuse.

**Key insight:** Use named capture groups (\`(?P<name>...)\`) in automation regex instead of positional groups. Named groups are self-documenting and resilient to order changes. Six months later, \`match.group('timestamp')\` is infinitely clearer than \`match.group(3)\`.`,
    },
    {
      id: 255,
      name: "pathlib & File Operations",
      desc: `**Python \`pathlib\`** — the modern, object-oriented file path library that replaced \`os.path\` for most file operations, providing a clean API for path construction, file system traversal, and file I/O.

**Core advantage:** Paths are objects, not strings. Operations are methods. The code reads like what it does.

\`\`\`python
from pathlib import Path

# Path construction — OS-agnostic (/ operator)
data_dir = Path('/data')
input_file = data_dir / 'raw' / 'report.csv'
output_file = input_file.parent / f"{input_file.stem}_processed{input_file.suffix}"
# → /data/raw/report_processed.csv

# File system queries
if input_file.exists():
    print(f"Size: {input_file.stat().st_size} bytes")
    print(f"Modified: {input_file.stat().st_mtime}")

# Reading and writing
content = input_file.read_text(encoding='utf-8')
output_file.write_text(processed_content)

data = input_file.read_bytes()  # Binary
output_file.write_bytes(data)

# Directory operations
output_dir = Path('/data/output')
output_dir.mkdir(parents=True, exist_ok=True)

# Glob patterns — returns Path objects
csv_files = list(data_dir.glob('**/*.csv'))  # Recursive
recent_logs = list(Path('/logs').glob('app-2024-*.log'))

# Path properties
path = Path('/data/reports/monthly/jan-2024.csv.gz')
path.name        # 'jan-2024.csv.gz'
path.stem        # 'jan-2024.csv'
path.suffix      # '.gz'
path.suffixes    # ['.csv', '.gz']
path.parent      # Path('/data/reports/monthly')
path.parts       # ('/', 'data', 'reports', 'monthly', 'jan-2024.csv.gz')
\`\`\`

**Key insight:** \`pathlib.Path('~').expanduser()\` and \`Path(__file__).parent\` solve two common but awkward patterns elegantly. The first resolves the home directory. The second gives you the directory containing the current script — the correct foundation for relative path construction in any script regardless of where it's invoked from.`,
    },
    {
      id: 256,
      name: "shutil & Bulk File Management",
      desc: `**Python \`shutil\`** — the standard library module for high-level file operations: copying, moving, renaming, archiving, and deleting files and directory trees. The automation workhorse for file-based pipelines.

\`\`\`python
import shutil
from pathlib import Path

# Copy files
shutil.copy('source.txt', 'destination.txt')  # Copy file, no metadata
shutil.copy2('source.txt', 'destination.txt')  # Copy file + preserve timestamps
shutil.copytree('/source/dir', '/dest/dir')  # Copy entire directory tree

# Move / rename
shutil.move('old_name.csv', 'new_name.csv')
shutil.move('/tmp/processed/', '/archive/2024/')

# Delete
shutil.rmtree('/tmp/work_dir')  # Delete directory tree (no confirmation!)
# ⚠️ shutil.rmtree is permanent — no trash/recycle bin

# Archives (zip, tar.gz)
shutil.make_archive('/backup/data_2024', 'zip', '/data/')
# → creates /backup/data_2024.zip

shutil.make_archive('/backup/data_2024', 'gztar', '/data/')
# → creates /backup/data_2024.tar.gz

shutil.unpack_archive('archive.zip', '/extract/to/')
shutil.unpack_archive('archive.tar.gz', '/extract/to/')

# Disk usage
total, used, free = shutil.disk_usage('/data')
print(f"Free: {free // (1024**3)} GB")
\`\`\`

**Bulk file processing pattern:**
\`\`\`python
from pathlib import Path
import shutil

source = Path('/data/incoming')
processed = Path('/data/processed')
failed = Path('/data/failed')

for csv_file in source.glob('*.csv'):
    try:
        process_file(csv_file)
        shutil.move(str(csv_file), str(processed / csv_file.name))
    except Exception as e:
        print(f"Failed: {csv_file.name}: {e}")
        shutil.move(str(csv_file), str(failed / csv_file.name))
\`\`\`

**Key insight:** Always test \`shutil.rmtree()\` calls with a dry run before deploying. The function has no confirmation prompt and no undo. A common pattern: log the directories that would be deleted before running, verify the output is correct, then uncomment the actual deletion.`,
    },
    {
      id: 257,
      name: "dotenv & Config Management",
      desc: `**dotenv & configuration management** — the practice of separating configuration (API keys, database URLs, environment-specific settings) from code, storing them in environment variables and \`.env\` files.

**The Twelve-Factor App principle:** Configuration that varies between environments (development, staging, production) belongs in environment variables, not hardcoded in source files. Never commit credentials to source control.

**Python python-dotenv:**
\`\`\`python
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file into environment variables
# .env:
# API_KEY=sk-abc123
# DATABASE_URL=postgresql://user:pass@localhost/db
# DEBUG=true

api_key = os.environ['API_KEY']  # Raises KeyError if missing (explicit)
db_url = os.getenv('DATABASE_URL')  # Returns None if missing (lenient)
debug = os.getenv('DEBUG', 'false').lower() == 'true'  # With default

# Load from specific path
load_dotenv('/etc/myapp/.env')

# Override existing env vars
load_dotenv(override=True)
\`\`\`

**Configuration validation pattern:**
\`\`\`python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    api_key: str  # Required — raises on startup if missing
    database_url: str
    max_retries: int = 3  # Optional with default
    debug: bool = False

    class Config:
        env_file = '.env'

settings = Settings()  # Validates and parses on import; fails fast if misconfigured
\`\`\`

**.env file organization:**
\`\`\`bash
# .env.example — committed to git, values redacted
API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:pass@host/db

# .env — actual values, NEVER committed to git
API_KEY=sk-abc123...
\`\`\`

**Key insight:** Use \`pydantic-settings\` or similar for configuration validation in production automation. Discovering that \`MAX_RETRIES\` was accidentally set to \`"three"\` (a string) when the job has already failed 10,000 times is much worse than the job refusing to start because the configuration is invalid.`,
    },
  ],
};
export default scriptDesktopAutomation;
