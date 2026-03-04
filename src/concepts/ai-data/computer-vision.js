const computerVision = {
  name: "Computer Vision",
  icon: "⊞",
  color: "#EF4444",
  concepts: [
    { id: 87, name: "Image Classification", desc: `Image classification assigns a single label to an entire image — answering "what is this?" It is the foundational computer vision task and the problem whose solution in 2012 triggered the modern deep learning era. Every subsequent vision task builds on the feature representations first developed for classification.

**The task:** given an image, output a probability distribution over a fixed set of classes (cat/dog, 1000 ImageNet categories, benign/malignant). The predicted class is the one with highest probability.

**The architecture evolution:**

**CNNs (2012–2020):** AlexNet showed deep convolutional networks dramatically outperform hand-crafted features. Subsequent architectures improved on the tradeoff between accuracy and compute:
- **VGG (2014):** deep, simple — only 3×3 convolutions stacked. Easy to understand and widely used as a feature extractor
- **ResNet (2015):** introduced residual (skip) connections that allow gradients to flow directly through very deep networks. ResNet-50/101/152 remain workhorse backbones. The skip connection was the architectural insight that enabled training networks of 100+ layers
- **EfficientNet (2019):** discovered via Neural Architecture Search. Scales width, depth, and input resolution together using a compound scaling rule — achieving better accuracy per FLOP than prior architectures

**Vision Transformers (2020–present):** applying the Transformer architecture directly to images. The ViT paper showed that with enough data, attention-based models match or exceed CNNs on classification. DINOv2 (Meta) produces features that transfer exceptionally well to downstream tasks without task-specific fine-tuning.

**ImageNet benchmark:** 1.28M training images across 1,000 categories. Top-1 accuracy on the ImageNet validation set is the standard measure of classification backbone quality. Human-level performance (~95%) was exceeded by models in 2015; modern models achieve 90–91% top-1. The benchmark's limitation: 1,000 clean categories do not capture the distribution of real-world images.

**Transfer learning is the standard workflow:** rather than training from scratch (which requires millions of labeled examples and significant compute), practitioners start from an ImageNet-pretrained backbone and fine-tune on their target dataset. Fine-tuning 10,000 labeled examples on a pretrained ResNet-50 routinely outperforms training from scratch on 1,000,000 examples — the pretrained features are that useful.

**Real-world example:** Google Lens classifies objects in photos taken by Android and iOS cameras — identifying plant species, dog breeds, landmarks, products, and text in real time. The classification backbone (a fine-tuned EfficientNet variant) runs on-device for latency and privacy, processing frames at 30+ fps. The same pretrained backbone is reused across dozens of downstream vision tasks: the classification pretraining is the shared investment that makes all of them cheaper.

**Key takeaway:** Image classification is solved for the ImageNet benchmark — the unsolved parts are out-of-distribution generalization (models fail on images outside the training distribution), long-tail recognition (rare classes with few examples), and fine-grained classification (distinguishing 200 bird species requires features that ImageNet training doesn't optimize for). For most production use cases, start with a pretrained ViT or EfficientNet backbone and fine-tune — training from scratch is rarely justified.` },
    { id: 88, name: "Object Detection", desc: `Object detection answers "what is in this image, and where?" — simultaneously classifying objects and localizing them with bounding boxes. It's the vision task that enables autonomous vehicles to see pedestrians, quality control systems to spot defects, and security cameras to identify individuals — any application that needs to know both identity and location.

**The output:** a set of bounding boxes, each with (x, y, width, height) coordinates defining a rectangular region and a class label with confidence score. A single image may contain dozens of detected objects.

**Two-stage detectors (accuracy-focused):**

**Faster R-CNN (2015):** the foundational two-stage architecture. Stage 1: a Region Proposal Network (RPN) scans the image and proposes candidate regions likely to contain objects. Stage 2: a classification head examines each proposed region and predicts class + refined bounding box. High accuracy, slower inference — ~5 fps on a GPU. Still used when detection precision is prioritized over speed.

**DETR (2020, Meta):** applies the Transformer architecture directly to detection — treats detection as a set prediction problem. No NMS (Non-Maximum Suppression) post-processing required; the model outputs a fixed set of predictions directly. DETR (and RT-DETR, the real-time variant) are now competitive with YOLO on speed/accuracy tradeoffs.

**Single-stage detectors (speed-focused):**

**YOLO (You Only Look Once):** processes the entire image in a single forward pass — no region proposals. Divides the image into a grid; each cell predicts bounding boxes and class probabilities directly. Dramatically faster than two-stage detectors at the cost of some accuracy on small or overlapping objects. YOLOv8 and YOLO11 (2023–2024) achieve excellent accuracy/speed tradeoffs.

YOLO family speed benchmarks on a modern GPU:
- YOLOv8n (nano): ~80 fps, mAP ~37 on COCO
- YOLOv8x (extra-large): ~18 fps, mAP ~54 on COCO

**COCO benchmark:** the standard evaluation dataset — 118K training images, 80 object categories, ~7 objects per image on average. Mean Average Precision (mAP) at IoU 0.5 is the primary metric. State-of-art models achieve mAP ~60+ on COCO val.

**Key concepts:**
- **IoU (Intersection over Union):** the ratio of the overlap between predicted and ground-truth box to their union. IoU > 0.5 typically counts as a correct detection
- **NMS (Non-Maximum Suppression):** eliminates duplicate detections by suppressing lower-confidence boxes that heavily overlap with a higher-confidence detection
- **Anchor boxes:** pre-defined reference box shapes at multiple scales and aspect ratios that detection heads use as starting points for prediction

**Real-world example:** Tesla's Autopilot vision stack uses a custom single-stage detection network running on their FSD chip at 36 fps across 8 cameras simultaneously — detecting vehicles, pedestrians, cyclists, traffic signs, lane markings, and road edges in real time. The network is a pure vision system (no LiDAR), trained on ~1B+ labeled frames from the Tesla fleet. Detection failures at highway speeds have sub-100ms consequences, making inference latency as critical a metric as accuracy.

**Key takeaway:** Choose your detection architecture based on the deployment constraint. Real-time applications (robotics, video, mobile) → YOLO family. Highest accuracy on static images where latency is acceptable → two-stage or DETR variants. For fine-grained detection (small objects, dense scenes), two-stage detectors still have an edge. Most production detection systems use pretrained COCO weights as initialization — the COCO features transfer well to most detection domains.` },
    { id: 89, name: "Image Segmentation", desc: `Image segmentation provides the finest-grained spatial understanding in computer vision: assigning a label or identity to every pixel in the image, not just a bounding box around objects. It's the difference between "there is a car in this image" (classification), "the car is in this region" (detection), and "these exact pixels are part of the car" (segmentation).

**The three segmentation tasks:**

**Semantic segmentation:** assign a class label to every pixel. Every pixel in the image is classified — road, sky, car, person, tree. Objects of the same class are not distinguished from each other: all cars get the same label regardless of whether they're different vehicles. U-Net, DeepLab, SegFormer. Applications: medical image analysis (segment tumor from healthy tissue), autonomous driving scene understanding, satellite image land cover mapping.

**Instance segmentation:** detect and segment each individual object separately. Unlike semantic segmentation, two cars are two distinct instances with separate masks. Requires both detection (finding objects) and segmentation (delineating their boundaries). Mask R-CNN (2017, Meta) is the foundational architecture — extends Faster R-CNN with a parallel mask prediction branch. YOLO-Seg adds instance segmentation to the YOLO family with minimal speed overhead.

**Panoptic segmentation:** combines semantic and instance segmentation — every pixel gets a class label, and every instance of "countable" objects (cars, people) gets a unique instance ID, while "uncountable" background classes (sky, road) are handled semantically. The most complete spatial understanding but also the most computationally demanding.

**SAM (Segment Anything Model, Meta 2023):** a foundation model for segmentation trained on 11M images and 1.1B masks — the largest segmentation dataset ever assembled. SAM accepts a prompt (a point, a bounding box, or text) and segments the object at that location. Its key capability: zero-shot generalization — it can segment objects it was never specifically trained on. SAM 2 (2024) extends this to video, tracking segmented objects across frames.

**Medical imaging — U-Net's dominance:** U-Net (2015) was designed specifically for biomedical image segmentation where training data is scarce. Its encoder-decoder architecture with skip connections between corresponding encoder and decoder layers preserves fine spatial detail lost in the bottleneck — critical for delineating thin structures like cell membranes. U-Net and its variants (U-Net++, Attention U-Net, Swin-UNet) remain the standard across radiology, pathology, and genomics imaging tasks.

**Real-world example:** Intuitive Surgical's da Vinci robotic surgery system uses semantic segmentation to identify anatomical structures — blood vessels, nerves, organs — in real-time endoscopic video during surgery. The system highlights structures the surgeon should avoid, reducing inadvertent damage. Segmentation accuracy here is literally life-critical: a misclassified pixel near a major artery has consequences no bounding box error does. The use case illustrates why segmentation's pixel-level precision matters — bounding boxes are insufficient when exact boundaries determine surgical outcomes.

**Key takeaway:** Choose segmentation granularity based on what downstream tasks actually require. If you need to measure object area, count cells, or guide a cutting instrument, pixel-level masks are necessary. If you just need to know whether objects overlap or their approximate size, bounding boxes suffice. SAM has dramatically reduced the cost of building segmentation datasets — use it for annotation (interactive prompting to create masks) even if your final model is task-specific.` },
    { id: 90, name: "Vision Transformers (ViT)", desc: `Vision Transformers apply the Transformer architecture — originally designed for text — directly to images, treating image patches as tokens. The 2020 ViT paper challenged the assumption that convolutions were necessary for visual understanding, showing that with sufficient data, attention-based models match and ultimately exceed CNNs on image recognition tasks.

**How ViT works:**
1. **Patch embedding:** split the image into a fixed grid of non-overlapping patches (e.g., 16×16 pixels each for ViT-16). Linearly project each patch into a fixed-size embedding vector — the "token" for that patch
2. **Position encoding:** add a learnable position embedding to each patch token so the model knows where each patch is in the image (Transformers have no built-in notion of spatial order)
3. **[CLS] token:** prepend a special classification token whose output representation after all Transformer layers is used as the image representation for downstream classification
4. **Transformer encoder:** apply L layers of multi-head self-attention + MLP. Each patch token attends to every other patch token — learning long-range spatial dependencies that local convolutions cannot capture in a single layer
5. **Classification head:** a linear layer applied to the [CLS] token output predicts class probabilities

**The data requirement:** the original ViT paper found that ViT-Large trained on ImageNet alone (1.28M images) was outperformed by ResNet — but trained on JFT-300M (Google's 300M image internal dataset), it significantly outperformed ResNets of equivalent compute. This sparked a research program in data-efficient ViT training.

**DeiT (Data-efficient Image Transformers, 2020):** introduced knowledge distillation from a CNN teacher to train ViT on ImageNet alone without the 300M image requirement. A "distillation token" learns to mimic the CNN teacher's outputs. DeiT-B matches ResNet-50 accuracy while training purely on ImageNet.

**Key architectural variants:**
- **DINOv2 (Meta, 2023):** self-supervised ViT trained on a curated 142M image dataset using a self-distillation objective. Produces features that transfer exceptionally well without fine-tuning — the best available general-purpose visual feature extractor for downstream tasks
- **SigLIP (Google, 2023):** CLIP-style image-text alignment training with sigmoid loss instead of softmax. More efficient for large-scale training, strong zero-shot performance
- **Swin Transformer (2021):** introduces hierarchical feature maps and shifted windows — addressing ViT's fixed-scale limitation and quadratic attention cost. Became the dominant backbone for dense prediction tasks (detection, segmentation) where multi-scale features are needed

**CNN vs. ViT — the current consensus:** ViTs have better scaling properties — performance improves more consistently with model size and data — and capture long-range dependencies more naturally. CNNs have stronger inductive biases for spatial locality (useful with limited data), are more compute-efficient at small scales, and remain competitive on mobile/edge deployments. For large-scale models with sufficient data, ViT dominates. For constrained environments, efficient CNNs (MobileNet, EfficientNet) are still preferred.

**Real-world example:** Google's Vision API and Google Photos' scene understanding switched from CNN-based backbones to ViT-based models. The improvement was most pronounced on tasks requiring global image context — understanding scene layout, identifying activities involving multiple people, and classifying ambiguous images where context from across the image is needed to disambiguate meaning. ViT's full-image attention is structurally suited to these tasks in a way that local convolutions are not.

**Key takeaway:** For any new vision project with sufficient training data, start with a pretrained ViT (DINOv2 for feature extraction, ViT-B/L fine-tuned for classification). For mobile or real-time constrained deployments, efficient CNNs remain the practical choice. The key ViT hyperparameter is patch size: smaller patches (8×8) give finer spatial resolution but quadratically more tokens and compute; larger patches (32×32) are faster but coarser. ViT-16 (16×16 patches) is the standard balanced choice.` },
    { id: 91, name: "Image Generation", desc: `Image generation models create new images from text descriptions, reference images, noise, or combinations thereof. The field has undergone a complete revolution since 2021 — diffusion models replaced GANs as the state of the art, and the quality leap has made AI-generated images effectively indistinguishable from photographs for many subjects.

**The dominant paradigm — Diffusion Models:**

Diffusion models learn to reverse a noise process. The forward process systematically adds Gaussian noise to a training image over T steps until it becomes pure noise. The model learns the reverse: starting from pure noise, iteratively denoise over T steps to produce a clean image.

The model trained is a U-Net (or Transformer-based variant) that predicts the noise present at each denoising step. At inference, start with random noise and apply the learned denoising T times — the trajectory converges to a realistic image.

**Text-to-image conditioning:** a text encoder (CLIP, T5) converts the text prompt into an embedding vector. This embedding conditions the denoising U-Net at each step via cross-attention — steering the denoising trajectory toward images consistent with the text. The quality of the text encoder determines how precisely the model follows complex prompts.

**Latent Diffusion Models (LDM):** running diffusion in pixel space is expensive — a 512×512 image has 786K pixels per channel. LDMs (the architecture behind Stable Diffusion) operate in a compressed latent space: a VAE encoder compresses the image to a latent representation ~8× smaller, diffusion runs in latent space, and the VAE decoder reconstructs the image. This reduces compute by ~64× with minimal quality loss.

**Key models:**
- **Stable Diffusion (Stability AI):** open-source LDM. SD 1.5 and SDXL are the most widely deployed open-source image generation models. Enormous ecosystem of fine-tuned variants (LoRA, DreamBooth) for specific styles and subjects
- **DALL-E 3 (OpenAI):** tightly integrated with ChatGPT. Strongest instruction following — handles complex compositional prompts, spatial relationships, and text in images better than most alternatives
- **Midjourney:** closed API, highest aesthetic quality for artistic/photographic styles. Favored for creative and commercial use
- **Imagen / Imagen 2 (Google):** used in Google products (Gemini, Google Slides AI generation). Strong photorealism

**Controllable generation:**
- **ControlNet:** add structural conditioning (pose skeletons, depth maps, edge maps, segmentation masks) to guide the generation while preserving the text prompt's content. Enables precise spatial control
- **LoRA (Low-Rank Adaptation):** fine-tune a small set of adapter weights to teach the model a specific subject, style, or domain without modifying base weights. A 10MB LoRA can capture a specific person's likeness or a specific artistic style

**Real-world example:** Adobe Firefly, integrated into Photoshop's Generative Fill, allows designers to select a region of a photo and generate contextually appropriate content — extending backgrounds, replacing objects, creating variations — entirely from text. Adobe trained Firefly exclusively on licensed content, addressing copyright concerns that plague models trained on scraped web data. Firefly processed over 3 billion generations in its first year, fundamentally changing creative production workflows.

**Key takeaway:** Diffusion models have made high-quality image generation accessible — Stable Diffusion runs on a consumer GPU. The remaining challenges are: precise spatial control of generated content (ControlNet helps, but complex compositions still struggle), text rendering in images (most models produce garbled text), consistent identity across images (faces and objects change subtly between generations), and copyright/originality questions about training data. For production use, evaluate models on your specific subject matter — performance varies dramatically across domains.` },
    { id: 92, name: "Video Understanding", desc: `Video understanding extends image analysis to sequences of frames — adding the temporal dimension that enables recognizing actions, tracking objects through time, understanding cause and effect, and capturing context that no single frame contains. It's substantially harder than image understanding: the data volume is orders of magnitude larger, temporal dependencies span hundreds of frames, and motion, occlusion, and viewpoint changes create challenges absent in still images.

**Why video is harder than images:**

**Scale:** a 1-minute video at 30fps is 1,800 frames. Processing every frame independently with an image model is computationally prohibitive and ignores temporal relationships. Efficient video models must learn which frames to attend to and how to aggregate temporal information.

**Temporal dependencies:** actions unfold over time — "opening a door" requires tracking hand position across dozens of frames. Models must capture both short-range motion (optical flow between adjacent frames) and long-range context (what happened 10 seconds ago affects what the current action means).

**Motion blur, occlusion, viewpoint change:** objects move, disappear behind other objects, and appear from different angles frame by frame. Temporal models must maintain identity and state across these challenges.

**Core tasks:**

**Action recognition:** classify the action occurring in a video clip ("jumping," "cooking," "handshaking"). Standard benchmarks: Kinetics-400/600/700 (400–700 action classes), Something-Something (emphasizing temporal reasoning over appearance). Architectures: SlowFast (processes frames at two temporal resolutions), Video Swin Transformer (3D shifted windows), VideoMAE (masked autoencoding for self-supervised video pretraining).

**Temporal action localization:** detect when in a video each action starts and ends — producing temporal bounding boxes. Harder than clip-level classification because it requires identifying action boundaries in untrimmed video.

**Video object tracking (VOT):** follow a specific object across frames. Given the object's location in frame 1, track it through subsequent frames despite motion, occlusion, and appearance changes. SORT, DeepSORT, ByteTrack are standard trackers used in surveillance and sports analytics.

**Video captioning / QA:** generate text descriptions of video content or answer questions about what happened. Requires integrating visual understanding with language generation. GPT-4V, Gemini 1.5 Pro, and video-LLMs handle this by processing sampled frames alongside audio transcripts.

**Optical flow:** estimate the per-pixel motion vector between consecutive frames — how many pixels did each point move, and in what direction? Traditional methods (Lucas-Kanade, Farneback) and modern learned methods (RAFT, FlowNet) both used. Flow is a powerful input feature for action recognition and video stabilization.

**Long-context video understanding:** Gemini 1.5 Pro processes up to 1M tokens, enabling analysis of 1-hour videos in a single context window — asking questions across the full video timeline rather than sampled clips. This unlocks video summarization, long-form QA, and event retrieval at scales previously impossible.

**Real-world example:** YouTube's content moderation system processes 500 hours of video uploaded per minute. A cascade of video classifiers runs on each upload: fast frame-sampling models flag potentially violating content for deeper analysis, action recognition models identify violent or harmful activities, and temporal models check whether flagged moments are in a harmful context or innocuous (a movie clip of violence vs. a real fight). The system processes billions of videos using efficient video transformers specifically designed to minimize per-frame compute while maintaining temporal reasoning quality.

**Key takeaway:** For video tasks, start by asking how much temporal context is necessary. For simple action classification, sampling 8–16 frames and applying an image model often works surprisingly well. For precise temporal localization or long-form understanding, dedicated video architectures (Video Swin, VideoMAE) or multimodal models with large context windows (Gemini) are needed. The practical constraint is almost always compute — video is data-hungry and inference-expensive, so efficient sampling and hierarchical processing are engineering necessities, not just optimizations.` },
    { id: 93, name: "Optical Character Recognition (OCR)", desc: `OCR converts images of text — printed documents, handwritten notes, photos of signs, scanned forms — into machine-readable text. It's one of the most commercially mature computer vision applications, powering document digitization, automated invoice processing, accessibility features, and every system that needs to extract structured information from unstructured visual documents.

**The OCR pipeline:**

**Text detection:** locate where text exists in the image — producing bounding boxes or polygons around text regions. Text can appear in arbitrary orientations, sizes, and layouts. DB-Net (Differentiable Binarization) and EAST (Efficient and Accurate Scene Text detector) are standard detection backbones. The detection step is distinct from recognition — a model that finds text regions doesn't necessarily read them.

**Text recognition:** given a cropped text region, transcribe the characters. CRNN (Convolutional Recurrent Neural Network with CTC loss) was the dominant architecture for a decade — convolutional layers extract visual features, recurrent layers model character sequence dependencies, and CTC (Connectionist Temporal Classification) loss trains without character-level alignment. Transformer-based recognizers (TrOCR, PaddleOCR's SVTR) now achieve better accuracy on complex fonts and noisy images.

**End-to-end approaches:** modern systems combine detection and recognition in a single model. PaddleOCR's PP-OCRv4 is the leading open-source system — faster and more accurate than Tesseract across diverse document types, with support for 80+ languages.

**Document understanding beyond raw OCR:**

Raw character extraction is insufficient for most applications — you need to understand document structure. Layout analysis identifies regions (title, paragraph, table, figure, header). Table extraction reconstructs the row/column structure of tables from their visual layout. Form parsing identifies field labels and their corresponding values. Document AI models (LayoutLM, Donut, Nougat) combine visual features with language understanding to extract structured information from documents in a single pass — bypassing the traditional OCR → NLP pipeline entirely.

**Handwriting recognition:** substantially harder than printed text due to variability in letterforms, slant, spacing, and noise. Historical document digitization (manuscripts, archives) requires models trained specifically on historical scripts. Modern models fine-tuned on handwritten data (IAM dataset) achieve character error rates below 5% on clean handwriting.

**Specialized domains:**
- **Mathematical OCR:** LaTeX formula recognition from handwritten or printed equations. Pix2Tex, MathPix convert math images to LaTeX
- **Scene text:** text in natural images — street signs, product labels, menus. More challenging than document OCR due to perspective distortion, variable lighting, and complex backgrounds
- **Medical records:** OCR on clinical notes, prescriptions, and lab results for healthcare digitization — high-stakes accuracy requirements

**Real-world example:** Amazon Textract is a managed OCR and document analysis service that extracts text, tables, and form fields from scanned documents. Major insurance companies use it to automate claims processing — extracting patient information, procedure codes, and cost figures from hundreds of thousands of paper claims daily. What previously required data entry teams now runs automatically, with human review only for low-confidence extractions. Textract's document understanding layer (beyond raw OCR) is what makes this commercially viable: knowing that "Date of Service:" is a field label and "03/15/2024" is its value requires layout understanding, not just character recognition.

**Key takeaway:** For most OCR needs today, use a managed API (Google Document AI, AWS Textract, Azure Document Intelligence) or PaddleOCR open-source — the engineering investment to build a custom OCR pipeline is rarely justified. The hard problems remaining are: handwriting with high variability, documents with complex layouts (multi-column tables, overlapping elements), low-quality scans (faded ink, bleed-through), and domain-specific notation (chemistry, music, math). For these, fine-tuning a base model on domain-specific data is more effective than improving the general-purpose pipeline.` },
    { id: 94, name: "3D Vision & Reconstruction", desc: `3D vision recovers the three-dimensional structure of the world from two-dimensional images — estimating depth, surface geometry, and spatial relationships that a flat image collapses into a single projection plane. It's the perceptual foundation of robotics, augmented reality, autonomous vehicles, and any system that needs to understand not just what objects are, but where they are in physical space.

**Depth estimation:**

**Stereo depth:** two cameras with a known baseline (like human eyes) view the same scene from slightly different positions. Matching corresponding points between the two images and applying geometric triangulation gives per-pixel depth. Depth error increases quadratically with distance. Used in Intel RealSense, ZED cameras, and vehicle stereo camera rigs.

**Monocular depth estimation:** estimate depth from a single 2D image using learned priors about scene geometry, object size, and perspective cues. Models (MiDaS, Depth Anything, ZoeDepth) trained on large diverse datasets achieve impressive qualitative results, but produce relative depth (this object is further than that one) rather than metric depth (this object is exactly 2.3m away) without additional calibration.

**LiDAR and RGB-D:** structured light sensors (Intel RealSense) and time-of-flight sensors (LiDAR) provide direct depth measurements. These are often combined with RGB cameras — the depth sensor provides metric depth; the camera provides color and texture. Autonomous vehicles typically use LiDAR + camera fusion for both depth precision and semantic richness.

**3D Reconstruction:**

**NeRF (Neural Radiance Fields, 2020):** represents a 3D scene as a continuous neural function — given a 3D position (x,y,z) and viewing direction, predict the color and density (opacity) at that point. Training on 20–100 photos of the same object from different angles, NeRF learns to synthesize photorealistic novel views from arbitrary viewpoints. The rendering quality for small-scale objects and scenes is remarkable. Limitations: slow training (hours), slow rendering (seconds per image), doesn't generalize to unseen scenes without retraining.

**3D Gaussian Splatting (3DGS, 2023):** represents the scene as millions of 3D Gaussians (colored ellipsoids) rather than a neural field. Rasterizes faster than NeRF by orders of magnitude — achieving real-time rendering (30+ fps) while maintaining comparable visual quality. Gaussian parameters are optimized via differentiable rendering. 3DGS has largely displaced NeRF for applications requiring interactive viewing.

**Structure from Motion (SfM):** classic multi-view reconstruction. Given many photos of a scene taken from different angles, SfM estimates camera positions and a sparse 3D point cloud. COLMAP is the standard open-source implementation. Used as preprocessing for NeRF/3DGS training and for creating 3D maps from crowdsourced images.

**Point clouds:** direct 3D representations as sets of (x,y,z) points, each optionally with color and surface normal. Generated by LiDAR, depth sensors, or SfM. PointNet, PointNet++, and 3D-specific Transformers process point clouds for classification, segmentation, and detection. The standard format for autonomous driving perception.

**Real-world example:** Luma AI's mobile app enables anyone to create 3D models of real-world objects using a smartphone video. The user walks around an object for 30–60 seconds; Luma's pipeline runs Structure from Motion to estimate camera positions, then trains a 3D Gaussian Splatting model on the extracted frames. The result is a photorealistic 3D scene that can be viewed from any angle in a web browser. What was previously a multi-day task requiring LiDAR and professional software now takes minutes on a consumer device — a direct result of the NeRF/3DGS wave making neural 3D reconstruction accessible.

**Key takeaway:** 3D vision is the bridge between the 2D image world and the 3D physical world. For metric depth in robotics and vehicles, LiDAR or stereo cameras remain necessary — monocular depth estimation is qualitatively useful but not metrically reliable enough for safety-critical navigation. For photorealistic 3D capture and novel view synthesis, 3D Gaussian Splatting is the current practical choice. The open problem that matters most for robotics and AR: real-time 3D reconstruction of dynamic scenes with moving objects — NeRF and 3DGS currently assume a static scene.` },
    { id: 95, name: "CLIP / Contrastive Learning", desc: `CLIP (Contrastive Language-Image Pretraining, OpenAI 2021) is the model that unified vision and language into a shared embedding space, enabling visual understanding without task-specific labeled data. It's the architectural foundation of virtually all modern multimodal AI systems — from image search to generative models to visual question answering.

**The training objective:**

CLIP is trained on 400M (image, text) pairs scraped from the internet — each pair is an image and its associated caption, alt-text, or surrounding text. The model trains two encoders: an image encoder (ViT or ResNet) and a text encoder (Transformer). The objective is **contrastive learning**: for a batch of N pairs, maximize the cosine similarity between the N correct (image, text) pairs while minimizing similarity between the N²−N incorrect pairings.

This creates a **shared embedding space** where the image of a cat and the text "a photograph of a cat" land near each other, while unrelated images and texts are pushed apart. The model never receives explicit visual labels — it learns visual semantics from the natural language supervision implicit in image-caption pairs.

**Zero-shot classification:** CLIP's most remarkable property. To classify an image into K categories (without any fine-tuning on those categories): encode the image; encode the text "a photo of a [category]" for each of K categories; predict the category whose text embedding is most similar to the image embedding. Evaluated this way, CLIP achieves ~76% top-1 accuracy on ImageNet — matching a ResNet-50 trained on 1.28M labeled ImageNet examples, despite having never seen an ImageNet label.

**Why zero-shot works:** the internet-scale training data contains millions of image-caption pairs covering almost every visual concept. The model learns to associate visual features with natural language descriptions, so it can recognize novel categories described in text without explicit examples.

**Applications beyond zero-shot classification:**
- **Semantic image search:** encode a text query, retrieve images with highest embedding similarity. Powers Google's reverse image search and every multimodal retrieval system
- **Text-to-image conditioning:** CLIP text embeddings are the standard conditioning signal for diffusion models — the text encoder in Stable Diffusion is CLIP ViT-L. The semantic richness of CLIP embeddings is what gives diffusion models their prompt-following capability
- **Visual question answering:** CLIP features feed into language models for visual reasoning tasks
- **Image-text retrieval:** find the best matching text for a given image, or the best matching image for a given text

**Variants and successors:**
- **SigLIP (Google, 2023):** replaces CLIP's softmax contrastive loss with sigmoid loss — enabling more efficient training on large batches without requiring all-pairs normalization. Stronger zero-shot and linear probe performance at equivalent compute
- **OpenCLIP:** open-source reproduction of CLIP trained on LAION-2B (2 billion internet image-text pairs). Comparable or better performance to original CLIP, fully open weights
- **DINOv2:** self-supervised (no text) ViT trained with a self-distillation objective — produces features that transfer to dense prediction tasks better than CLIP

**Real-world example:** Pinterest's visual search ("Shop the Look") uses CLIP-based embeddings to retrieve products visually similar to items in user-uploaded photos. A user photographs a room; CLIP encodes the image; the system retrieves furniture and decor products whose embeddings are nearest in the shared visual space. No explicit product labels or category annotations are required — the CLIP embedding captures visual similarity across style, color, and form that users care about but are hard to label explicitly.

**Key takeaway:** CLIP embeddings are the lingua franca of multimodal AI — the representation that lets vision and language systems communicate. Before building custom vision features, check whether CLIP or SigLIP zero-shot performance already meets your accuracy requirements. For retrieval applications specifically, CLIP embeddings stored in a vector database provide semantic visual search with no labeled data and minimal engineering. The main limitation: CLIP learns from image-level captions and struggles with fine-grained spatial understanding (where exactly in the image is the cat?).` },
    { id: 96, name: "Data Augmentation (Vision)", desc: `Data augmentation artificially expands a training dataset by applying label-preserving transformations to existing images — creating new training examples that expose the model to more variation without collecting or labeling additional data. It's one of the highest-ROI techniques in computer vision, regularly providing 2–5% accuracy improvements for essentially zero additional cost.

**The principle:** a correctly classified image should remain correctly classified under transformations that preserve its semantic content — a cat is still a cat if you flip the image horizontally, adjust its brightness, or crop a portion of it. Training on these transformed versions forces the model to learn features invariant to these transformations, improving generalization to real-world variation in pose, lighting, and framing.

**Core geometric transformations:**
- **Random horizontal flip:** for most natural image tasks, left-right symmetry holds (a cat facing left is still a cat). Standard in almost every vision training pipeline. Note: not appropriate when orientation matters (text recognition, satellite imagery with directional context)
- **Random crop:** crop a random region of the image and resize to the input dimensions. Teaches the model to recognize objects from partial views and different scales. One of the most impactful single augmentations
- **Random rotation:** rotate by ±N degrees. Useful when objects appear at various orientations (aerial imagery, medical scans)
- **Resize and scaling:** vary the scale at which the model sees objects, building scale invariance

**Photometric transformations:**
- **Color jitter:** randomly vary brightness, contrast, saturation, and hue. Teaches illumination invariance. Critical for models deployed across variable lighting conditions
- **Grayscale conversion:** randomly convert to grayscale during training. Prevents color from being an over-relied-upon feature; improves robustness to grayscale inputs
- **Gaussian blur / noise:** simulate focus blur and sensor noise. Improves robustness to image quality variation

**Advanced augmentations:**
- **Cutout / Random Erasing:** randomly mask a rectangular region of the image with zeros or noise during training. Forces the model to classify from partial observations, improving robustness to occlusion. Cutout improved WideResNet accuracy on CIFAR-10 from 96.92% to 97.12%
- **Mixup:** blend two training images together (weighted average of pixels) and blend their labels proportionally. Trains the model on "between-class" examples, smoothing decision boundaries and improving calibration. Conceptually: 50% cat + 50% dog → label is [0.5 cat, 0.5 dog]
- **CutMix:** cut a rectangular patch from one image and paste it onto another, mixing their labels proportionally by area. Combines Cutout's occlusion robustness with Mixup's label smoothing
- **RandAugment:** automates augmentation policy selection — applies N random augmentations from a fixed list, each with magnitude M. Eliminates manual augmentation policy design. Competitive with policies found by automated search but far simpler to tune

**Self-supervised augmentation (SimCLR, DINO):** in contrastive self-supervised learning, augmentations play a fundamentally different role — they define the invariances the model learns. Two augmented views of the same image are the "positive pair" that the model is trained to match. The choice of augmentation types directly determines what invariances get encoded: including color jitter → color-invariant features; excluding it → color-sensitive features.

**Real-world example:** The winning solution to the 2021 Kaggle Cassava Leaf Disease competition (identify plant diseases from leaf photos) used an aggressive augmentation stack: random flips, crops, color jitter, Mixup, CutMix, and CoarseDropout — applied stochastically during training. The augmentation pipeline alone accounted for ~2.5% accuracy improvement over the base model. Crucially, the training images were collected under controlled greenhouse conditions while test images were taken by farmers in fields — the augmentations were deliberately chosen to bridge this domain gap, simulating the variable lighting, angles, and partial occlusions of field photography.

**Key takeaway:** Data augmentation is not optional for vision models — it's a core component of the training recipe. Standard augmentations (flip, crop, color jitter) should always be included. Advanced augmentations (Mixup, CutMix, RandAugment) provide additional gains for most tasks and are worth the modest implementation cost. Design augmentations to match the distribution shift between your training data and deployment conditions — the best augmentations simulate the specific variations your model will encounter in production.` },
  ],
};
export default computerVision;
