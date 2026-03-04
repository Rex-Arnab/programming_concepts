const dataScienceAnalytics = {
  name: "Data Science & Analytics",
  icon: "📊",
  color: "#ec4899",
  concepts: [
    {
      id: 1006,
      name: "What is Data Science",
      desc: `**Data science** — the interdisciplinary field that uses statistical methods, computational tools, and domain expertise to extract insights and knowledge from structured and unstructured data, and to build predictive models that inform decisions or automate tasks.

**The data science hierarchy (from foundational to advanced):**
1. **Data collection & storage** — data engineering (pipelines, warehouses)
2. **Data cleaning & exploration** — EDA, data quality
3. **Analytics & reporting** — descriptive statistics, dashboards, BI
4. **Statistical analysis** — hypothesis testing, A/B testing, inferential statistics
5. **Machine learning** — predictive modeling, classification, regression
6. **Deep learning / AI** — neural networks, NLP, computer vision

**Data science roles:**
- **Data analyst:** SQL-heavy; descriptive analytics; dashboards; answers "what happened?"
- **Data scientist:** statistics + ML; answers "why did it happen?" and "what will happen?"
- **ML engineer:** operationalizes models; bridges data science and software engineering
- **Data engineer:** builds the infrastructure data scientists use

**The toolchain:** Python (pandas, scikit-learn, PyTorch), SQL, Jupyter notebooks, visualization (Matplotlib, Seaborn, Plotly), cloud ML platforms (SageMaker, Vertex AI, Azure ML).

**Key insight:** Most data science value in organizations comes from descriptive analytics and experimentation (A/B testing), not from cutting-edge ML models. A well-built dashboard often creates more business impact than a complex model.`,
    },
    {
      id: 1007,
      name: "Exploratory Data Analysis (EDA)",
      desc: `**EDA (Exploratory Data Analysis)** — the initial investigation of a dataset using statistical summaries and visualizations to understand its structure, patterns, outliers, and relationships before applying models. "Look at the data before modeling it."

**EDA workflow:**
1. **Shape and types:** "df.shape," "df.dtypes," "df.info()" — how many rows/columns? What are the types?
2. **Missing values:** "df.isnull().sum()" — which columns have nulls? What percentage? Random or systematic?
3. **Distributions:** "df.describe()" for numerical columns (min, max, mean, std, quartiles); histograms; box plots
4. **Categorical distributions:** value counts for categorical columns; rare values; unexpected categories
5. **Correlations:** heatmap of "df.corr()"; pairplot for feature relationships; correlation ≠ causation
6. **Outliers:** box plots, z-scores, IQR method; are outliers data errors or real extreme values?
7. **Temporal patterns:** if time column exists, plot values over time; look for trends, seasonality, anomalies

**Key EDA questions:**
- Is there data leakage (a feature that reveals the target before prediction time)?
- Are distributions consistent with expectations (no impossible values like negative age)?
- Are there strong correlations that suggest multicollinearity?

**Key insight:** EDA is not optional — skipping it leads to models trained on dirty data, incorrect assumptions, and features that don't generalize. 80% of data science work is understanding and cleaning data.`,
    },
    {
      id: 1008,
      name: "Feature Engineering",
      desc: `**Feature engineering** — the process of transforming raw data into features (input variables) that improve model performance. "The most important skill in data science is not knowing algorithms — it's knowing how to craft features."

**Common techniques:**

**Numerical:**
- Log transform: compress skewed distributions (income, population); log(x+1) for zero-safe
- Binning / discretization: convert continuous to categorical ranges (age → age_group)
- Polynomial features: capture non-linear relationships (x^2, x*y interactions)
- Normalization (0-1 scaling) and standardization (z-score) — required for distance-based models

**Categorical:**
- One-hot encoding: convert categories to binary columns (country → is_US, is_UK, ...)
- Target encoding: replace category with mean target value (risky — causes leakage if not done correctly in CV)
- Embeddings: learned vector representations for high-cardinality categoricals

**Time-based:**
- Extract: hour, day_of_week, is_weekend, month, quarter
- Lag features: "revenue yesterday," "revenue 7 days ago" — capturing temporal patterns
- Rolling windows: "7-day moving average of revenue"
- Time since event: "days since last purchase"

**Domain features:**
- Ratios: "revenue_per_user," "click_through_rate"
- Interaction terms: "is_new_user * is_discount_active"

**Key insight:** A simple model with great features beats a complex model with raw features. Feature engineering encodes domain knowledge that no algorithm can learn on its own.`,
    },
    {
      id: 1009,
      name: "Statistical Fundamentals for Data Science",
      desc: `**Descriptive statistics** — summarize data: mean (average), median (50th percentile), mode (most frequent), variance (spread around mean), standard deviation (√variance), percentiles (25th, 75th), IQR (interquartile range).

**Why median over mean:** mean is sensitive to outliers (one billionaire makes a neighborhood's mean income misleading). Median is robust to extremes. For income, page load time, and any right-skewed distribution, prefer median.

**Normal distribution:** bell curve where 68% of data falls within ±1σ, 95% within ±2σ, 99.7% within ±3σ. Many statistical tests assume normality (check with Shapiro-Wilk or Q-Q plots before applying).

**Hypothesis testing:**
- Null hypothesis (H0): "no effect" (new feature has no impact on conversion)
- Alternative hypothesis (H1): "there is an effect"
- p-value: probability of observing this result if H0 is true; reject H0 if p < α (typically 0.05)
- Type I error (false positive): reject H0 when it's true (α)
- Type II error (false negative): fail to reject H0 when it's false (β); power = 1-β
- t-test: compare means of two groups; chi-square test: compare categorical distributions

**Correlation vs causation:** correlation measures linear association (-1 to +1). High correlation does not imply one variable causes the other. Ice cream sales and drowning rates are correlated (both peak in summer) — confounded by temperature.

**Key insight:** Misapplied statistics destroy more data projects than poor algorithms. Understanding p-values, effect sizes, and the difference between statistical and practical significance is non-negotiable for honest data science.`,
    },
    {
      id: 1010,
      name: "Pandas & DataFrames",
      desc: `**Pandas** — the Python library for data manipulation and analysis. Its core data structure, the DataFrame, is a 2D labeled table (like a SQL table or Excel spreadsheet) that supports vectorized operations on columns, making data transformation 10-100x faster than Python loops.

**Core operations:**
- "df.read_csv(), read_parquet(), read_sql()" — data ingestion
- "df.head(), df.info(), df.describe()" — exploration
- "df[df['age'] > 30]" — boolean filtering
- "df.groupby('region')['revenue'].sum()" — aggregation
- "pd.merge(left, right, on='id', how='left')" — joining DataFrames
- "df.pivot_table(values='sales', index='region', columns='month', aggfunc='sum')" — pivoting
- "df['col'].apply(fn)" — row-wise function application
- "df.melt()" — wide to long format transformation

**Performance pitfalls:**
- "df.apply(fn, axis=1)" per-row application in Python is slow; use vectorized operations instead
- Chaining multiple copies ("df = df[mask]" vs "df.query(mask)") — use "inplace=False" but avoid "inplace=True" (confusing behavior)
- Pandas operations load all data into RAM — for files > RAM size, use Dask (parallel Pandas), Polars (Rust-based, 5-10x faster), or DuckDB

**Polars vs Pandas:** Polars is a modern replacement — lazy evaluation, multi-threaded, no GIL, 5-10x faster for large DataFrames. Growing rapidly in the data science ecosystem.

**Key insight:** Pandas is essential knowledge, but for large datasets (>1GB), explore Polars or DuckDB. DuckDB in particular lets you query Parquet/CSV files with SQL syntax — "SELECT * FROM 'data.parquet'" — often faster than pandas on the same file.`,
    },
    {
      id: 1011,
      name: "SQL for Analytics (Advanced)",
      desc: `**Analytical SQL patterns** — advanced SQL techniques used by data analysts and scientists for complex data investigation beyond basic aggregations.

**Cohort analysis:** group users by a shared characteristic (signup month) and track behavior over time. Classic pattern: "SELECT DATE_TRUNC('month', first_order_date) AS cohort, DATE_TRUNC('month', order_date) AS period, COUNT(DISTINCT user_id) FROM orders GROUP BY 1, 2."

**Retention analysis with self-join:**
"SELECT users at period 0 INNER JOIN users at period N ON user_id" — identifies which users from cohort 0 are still active at month N.

**Funnel analysis:** track conversion through ordered steps using conditional aggregation:
"SUM(CASE WHEN step = 'signup' THEN 1 END) AS signups, SUM(CASE WHEN step = 'purchase' THEN 1 END) AS purchases."

**Sessionization:** group events into sessions by user with a gap threshold — use LAG() to compute time since previous event, then cumulative sum of "new session" flags.

**Running totals and cumulative metrics:** "SUM(revenue) OVER (PARTITION BY user_id ORDER BY date ROWS UNBOUNDED PRECEDING)" — cumulative revenue per user by date.

**Percentile calculations:** "PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY load_time)" — exact median; "APPROX_PERCENTILE(load_time, 0.99)" — approximate 99th percentile (faster on billions of rows).

**Key insight:** Most analytical questions that seem to require Python/pandas are expressible in SQL and run 10-100x faster in a columnar data warehouse. Master analytical SQL before reaching for pandas.`,
    },
    {
      id: 1012,
      name: "Business Intelligence (BI) Tools",
      desc: `**Business Intelligence (BI) tool** — software that connects to data sources (data warehouse, databases) and enables non-technical users to explore data, build dashboards, and answer business questions through a visual interface.

**Key BI tools:**
- **Tableau** — industry leader for visual analytics; drag-and-drop; highly expressive; expensive; best for exploratory analysis
- **Looker (Google)** — "LookML" data modeling layer defines metrics once, used everywhere; excellent governance and consistency across dashboards
- **Metabase** — open-source; easy setup; good for engineering teams and technical users; SQL editor + GUI
- **Superset (Apache)** — open-source; full-featured; supports hundreds of data sources; good alternative for cost-conscious teams
- **Power BI (Microsoft)** — dominant in Microsoft/Azure shops; DAX formula language; deep Office integration
- **Redash** — simple open-source SQL-based dashboarding

**BI anti-patterns:**
- Metric proliferation: 50 different "revenue" definitions across dashboards (Looker's semantic layer solves this)
- Copy-paste SQL: same query logic duplicated across 20 dashboards (use a shared data model layer)
- "Pixel-perfect" reporting for executives that takes weeks to build (agile BI is better)

**The semantic layer:** tools like Looker (LookML) and dbt metrics define business metrics (revenue, DAU, LTV) in code — a single definition used everywhere, preventing discrepancies between dashboards.

**Key insight:** BI tool choice matters less than having a clean, well-documented data model underneath. Beautiful dashboards on top of messy, undocumented data are worse than ugly dashboards on well-modeled data.`,
    },
    {
      id: 1013,
      name: "A/B Testing & Experimentation",
      desc: `**A/B testing (randomized controlled experiment)** — randomly assigning users to two (or more) variants of a product (control vs treatment) and measuring the causal effect of the change on a target metric. The gold standard for establishing causal relationships in product development.

**Anatomy of an A/B test:**
1. Define hypothesis and primary metric (conversion rate, revenue, retention)
2. Calculate required sample size (power analysis: effect size, α=0.05, power=0.8)
3. Randomly assign users to control/treatment (stable assignment: same user always sees same variant)
4. Run test until required sample size is reached
5. Analyze: t-test or z-test for proportions; check p-value against α; report effect size + confidence interval
6. Make decision; ship or revert

**Statistical pitfalls:**
- **Peeking:** stopping the test early when results look significant — inflates false positive rate (use sequential testing or pre-specify duration)
- **Multiple comparisons:** testing 10 metrics increases probability of a false positive — apply Bonferroni correction or control FDR
- **Simpson's Paradox:** results can reverse when segmented differently — investigate heterogeneous treatment effects
- **Novelty effect:** users engage more with anything new — wait for novelty to wear off before reading results

**Bayesian A/B testing:** instead of p-values, compute posterior probability that treatment beats control; can stop early with controlled risk. More intuitive interpretation for business stakeholders.

**Key insight:** Running trustworthy A/B tests requires more statistical rigor than most teams apply. Shipping a harmful change due to an underpowered test or early peeking is a common and costly mistake.`,
    },
    {
      id: 1014,
      name: "ML Feature Stores",
      desc: `**Feature store** — a centralized data infrastructure for storing, discovering, sharing, and serving ML features — the engineered input variables used to train and serve ML models. Solves the problem of feature duplication and train/serve skew.

**The problem without a feature store:**
- Data scientists rewrite the same feature transformations (e.g., "user's 30-day purchase count") independently for every model project
- The feature computation in training (batch Python/pandas) differs from serving (real-time API) — "train/serve skew" causes production degradation
- No shared catalog of available features — teams duplicate work

**Feature store components:**
- **Offline store:** historical feature data (Parquet on S3, Delta Lake) for batch training
- **Online store:** low-latency key-value store (Redis, DynamoDB, Cassandra) for real-time inference
- **Feature registry/catalog:** searchable inventory of features with documentation and ownership
- **Materialization job:** computes features from raw data and writes to both offline and online stores

**Feature stores:**
- **Feast** (open-source): simple, popular, integrates with GCP/AWS; offline + online stores
- **Tecton** (commercial): enterprise-grade; streaming feature computation; powerful but expensive
- **Hopsworks** (open-source): full-featured; includes model registry
- **Vertex AI Feature Store** (GCP), **SageMaker Feature Store** (AWS)

**Key insight:** Feature stores are essential at scale — when 50+ ML models each recompute "user engagement score" differently, training/serving inconsistencies and duplicated effort become critical problems.`,
    },
    {
      id: 1015,
      name: "Analytical Engineering",
      desc: `**Analytical engineering** — the practice of applying software engineering discipline (version control, testing, modularity, documentation, CI/CD) to the process of building and maintaining data models and analytical pipelines. Bridges the gap between data engineering and data analysis.

**The role:** the "analytics engineer" (popularized by dbt Labs) is responsible for transforming raw data into clean, well-documented, tested data models that analysts and scientists can trust. They sit between data engineers (infrastructure) and data scientists (insights).

**Core practices:**
- **Version control for SQL:** every transformation in Git; peer review via pull requests; no one-off SQL files
- **Testing:** automated tests on every model run (null checks, uniqueness, referential integrity, business logic assertions)
- **Documentation:** every table and column has a description; auto-generated searchable data catalog
- **Modularity:** build with "{{ ref() }}" instead of hardcoded table names; staging → intermediate → mart layers
- **Semantic layer:** define metrics (revenue, DAU, LTV) once in code; consumed by all BI tools

**The "analytics engineering" gap:** without this discipline, data transformations are undocumented SQL scripts in shared Google Docs, dashboards break without warning when upstream tables change, and no one knows who "owns" a table or whether to trust its numbers.

**Tools:** dbt (the primary tool), SQLMesh (alternative with better state management), SDF (compilation-time analysis).

**Key insight:** Analytical engineering treats the data model as production software — with the same quality standards as application code. This shift from "analyst SQL" to "engineered data model" is the single biggest improvement a data team can make.`,
    },
  ],
};

export default dataScienceAnalytics;
