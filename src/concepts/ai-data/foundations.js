const foundations = {
  name: "Foundations",
  icon: "◆",
  color: "#A78BFA",
  concepts: [
    { id: 1, name: "Artificial Intelligence (AI)", desc: `Artificial Intelligence is the broad field concerned with building systems that can perform tasks which, when done by a human, would require intelligence. The definition has shifted continuously — systems once considered AI (chess engines, OCR) are now considered mere software once the problem is solved. This phenomenon, called the "AI effect," means AI is perpetually redefined as the frontier of the unsolved.

**The conceptual landscape:**
- **Narrow AI (ANI — Artificial Narrow Intelligence):** systems that excel at one specific task — AlphaGo plays Go better than any human but cannot do anything else; GPT-4 generates text but cannot control a robot. Every deployed AI system today is narrow AI
- **Artificial General Intelligence (AGI):** a hypothetical system that can learn and perform any intellectual task a human can — matching human-level flexibility and reasoning across domains. No such system exists, though frontier labs (OpenAI, DeepMind, Anthropic) explicitly cite it as a research goal
- **Artificial Superintelligence (ASI):** a hypothetical system surpassing human intelligence across all domains — the subject of significant safety research but currently speculative

**The three main approaches to building AI:**
- **Symbolic AI (GOFAI):** explicit rules, logic, and knowledge representation — how 1980s expert systems worked. Brittle: falls apart on data outside the hand-coded rules
- **Statistical/ML:** let algorithms find patterns in data rather than encoding rules by hand — dominant since the 2010s
- **Hybrid:** combining symbolic reasoning with learned representations (neurosymbolic AI) — an active research direction

**Real-world example:** When IBM's Deep Blue defeated Garry Kasparov in 1997, it was heralded as a landmark AI achievement. Today, a chess engine on a smartphone outperforms Deep Blue by a large margin — and no one calls it AI anymore. Meanwhile, systems that generate coherent prose, diagnose diseases from images, and write functional code are considered cutting-edge AI. The field defines itself by what machines still can't do reliably.

**Key takeaway:** AI is not a technology — it's a category of problems. Understanding the narrow/general distinction is crucial: every claim about AI "taking over" or "becoming sentient" is a confusion between narrow systems (real, today) and AGI (hypothetical, actively debated). The practical work of AI is building narrow systems that are reliable, fair, and useful — a hard enough problem to occupy the field for decades.` },
    { id: 2, name: "Machine Learning (ML)", desc: `Machine Learning is the subfield of AI that gives computers the ability to learn from data without being explicitly programmed with rules. Instead of writing "if the email contains these words → spam," you show the system thousands of examples of spam and not-spam and let it discover the rules itself.

**The fundamental shift:** Traditional programming maps inputs to outputs via human-written rules: Input + Rules → Output. Machine learning inverts this: Input + Output (examples) → Rules (learned by the model). The program writes itself from data.

**The three learning paradigms:**
- **Supervised learning:** the training data includes correct answers (labels). The model learns to map inputs to outputs by minimizing its mistakes on those labeled examples
- **Unsupervised learning:** the data has no labels. The model finds structure on its own — grouping similar items, compressing information, detecting anomalies
- **Reinforcement learning:** the model (an "agent") learns by trial and error in an environment, receiving rewards for good actions and penalties for bad ones

**What ML requires:** (1) **Data** — enough examples that the model can generalize beyond the training set; (2) **A learning algorithm** — the procedure that adjusts the model to reduce errors; (3) **A loss function** — a measure of how wrong the model currently is, which the algorithm minimizes; (4) **Compute** — training complex models on large datasets requires significant computation

**Real-world example:** Google Translate in 2006 used hand-coded linguistic rules built by language experts — and produced stilted, often incorrect translations. In 2016, they switched to a neural ML model trained on millions of human-translated sentence pairs. Translation quality improved more in that one switch than in the previous ten years of rule-engineering combined. The difference: the ML model discovered translation patterns too subtle and complex for humans to articulate as explicit rules.

**Key takeaway:** ML is most valuable when the rules governing a problem are too complex or too numerous to write by hand, but examples of correct behavior are abundant. The model's power comes entirely from the quality and quantity of its training data — "garbage in, garbage out" is the most consequential principle in applied ML.` },
    { id: 3, name: "Deep Learning (DL)", desc: `Deep Learning is the subfield of machine learning that uses neural networks with many layers — "deep" refers to the depth of these layer stacks. It's what powered the AI renaissance of the 2010s and underlies virtually every breakthrough in vision, language, and generative AI today.

**Why depth matters:** A shallow network (1–2 hidden layers) can theoretically approximate any function, but requires an exponentially large number of neurons to do so. Deep networks solve this differently: each layer learns a progressively abstract representation of the input. A deep image classifier learns edges in layer 1, textures in layer 2, parts in layer 3, and objects in layer 4 — building complexity hierarchically, which is far more parameter-efficient.

**The enabling conditions:** Deep learning existed theoretically for decades but only became practical when three things converged:
1. **Data:** the internet produced massive labeled datasets (ImageNet: 14M images; Common Crawl: petabytes of web text)
2. **Compute:** GPUs — originally built for gaming — turned out to be ideal for the massively parallel matrix multiplications that neural networks require; training time dropped 10,000×
3. **Algorithms:** better activation functions (ReLU replaced sigmoid, fixing the vanishing gradient problem), better regularization (dropout, batch normalization), and better optimizers (Adam)

**The hierarchy:** Deep Learning ⊂ Machine Learning ⊂ Artificial Intelligence. All deep learning is ML; not all ML is deep learning (random forests and SVMs are ML but not deep learning).

**Real-world example:** ImageNet Large Scale Visual Recognition Challenge (ILSVRC) 2012 is the pivotal moment. For years, the best error rate on classifying 1,000 object categories was ~26%. Then AlexNet — a deep convolutional network — achieved 15.3%, nearly halving the error rate. Competitors using non-deep-learning methods were still at 26%. The following year, every top entry used deep learning. The 2012 result made deep learning the default approach for computer vision within 18 months.

**Key takeaway:** Deep learning's power comes from learning representations directly from raw data — removing the need for hand-crafted features. Its weaknesses are data hunger (requires large labeled datasets), compute cost (training GPT-4 cost ~$100M+), and opacity (interpreting what a deep network learned is genuinely hard). For tabular data with limited samples, classical ML (gradient boosting) often still outperforms deep learning.` },
    { id: 4, name: "Neural Networks", desc: `A neural network is a computational graph of interconnected nodes (neurons) organized into layers, where information flows from input to output and each connection carries a learned weight. The name is inspired by biological neurons, though the mathematical reality is far simpler than actual neuroscience — they are, fundamentally, compositions of matrix multiplications and nonlinear functions.

**The architecture:**
- **Input layer:** receives raw features (pixel values, word embeddings, sensor readings)
- **Hidden layers:** intermediate layers that learn increasingly abstract transformations of the input. The "depth" of a network is the number of hidden layers
- **Output layer:** produces the final prediction — a class probability vector (classification), a scalar (regression), a token distribution (language generation)

**How learning happens:** Each neuron computes: output = activation_function(Σ(weight_i × input_i) + bias). The weights and biases are the learnable parameters, initialized randomly and iteratively adjusted during training via gradient descent to minimize the loss function.

**Why nonlinearity is essential:** Without activation functions (ReLU, sigmoid, tanh), stacking multiple linear layers is mathematically equivalent to a single linear layer — you get no additional representational power from depth. Activation functions introduce nonlinearity, allowing networks to approximate arbitrarily complex functions. This is the Universal Approximation Theorem: a network with a single hidden layer and enough neurons can approximate any continuous function — but depth makes this far more efficient in practice.

**Scale:** Modern neural networks range from thousands of parameters (a simple classifier) to trillions (GPT-4, estimated ~1.8T parameters in a mixture-of-experts architecture). The relationship between scale and capability has proven remarkably consistent: more parameters, more data, and more compute reliably produce better models — a scaling law first formalized by OpenAI researchers in 2020.

**Real-world example:** The neural network behind Shazam's music recognition listens to a few seconds of audio, converts it to a frequency spectrogram (a 2D image of sound), and passes it through a convolutional network that matches it against a database of 80M+ songs — typically in under a second. The network wasn't programmed with music theory rules; it learned to identify songs by training on millions of audio fingerprints.

**Key takeaway:** Neural networks are function approximators that learn their own internal representations. Their power comes from depth (hierarchical representation), nonlinearity (expressive capacity), and scale (parameter count × data). Understanding the input → weights → activation → output flow at each layer is the mental model that everything else in deep learning builds on.` },
    { id: 5, name: "Supervised Learning", desc: `Supervised learning is the most widely deployed ML paradigm. A model learns a mapping from inputs to outputs by training on a dataset of (input, correct output) pairs — the "supervision" is the human-provided labels that tell the model what the right answer is.

**The two main task types:**
- **Classification:** predict which category an input belongs to. Binary (spam/not-spam, malignant/benign) or multi-class (which of 1,000 ImageNet categories is this image?). Output: class probabilities. Algorithms: logistic regression, decision trees, random forests, SVMs, neural networks
- **Regression:** predict a continuous numerical value. House price prediction, stock return forecasting, temperature estimation. Output: a scalar. Algorithms: linear regression, gradient boosting, neural networks

**The training loop:**
1. Feed a batch of labeled examples through the model
2. Compare the model's predictions to the true labels using a loss function (cross-entropy for classification, MSE for regression)
3. Compute gradients of the loss with respect to model parameters
4. Update parameters in the direction that reduces the loss (gradient descent)
5. Repeat until performance on validation data stops improving

**The data requirement:** Supervised learning requires labeled data — and labeling is expensive. Medical image datasets require radiologist annotations at $50–$200 per image. Autonomous driving datasets require frame-by-frame labeling of every car, pedestrian, and road marking. This cost is what makes self-supervised and semi-supervised learning so important — they dramatically reduce the labeled-data requirement.

**Real-world example:** Gmail's spam filter is a supervised classifier trained on billions of emails labeled "spam" and "not spam" by users who click "report spam." Each user action is a training signal. The model has seen so many examples across so many email patterns that it generalizes to new spam variants it's never seen before — including adversarially crafted spam designed to evade detection. The filter makes billions of decisions per day with >99.9% accuracy.

**Key takeaway:** Supervised learning is the right tool when you have labeled examples of correct behavior and want to generalize that behavior to new, unseen inputs. Its quality ceiling is the quality of the labels — mislabeled training data produces confidently wrong models. The critical discipline is curating and validating your training labels before spending compute on model training.` },
    { id: 6, name: "Unsupervised Learning", desc: `Unsupervised learning finds structure in data with no human-provided labels. The model receives only inputs — no correct answers — and must discover patterns, groupings, and representations on its own. It's the closest ML gets to genuine exploration.

**The main families of tasks:**

**Clustering:** partition data into groups where within-group similarity is high and between-group similarity is low. K-Means assigns each point to its nearest centroid. DBSCAN finds dense regions and marks sparse points as outliers. HDBSCAN handles varying cluster densities. Applications: customer segmentation, document grouping, gene expression analysis.

**Dimensionality reduction:** compress high-dimensional data into fewer dimensions while preserving meaningful structure. PCA finds linear directions of maximum variance. t-SNE and UMAP find nonlinear low-dimensional embeddings, excellent for visualization. Autoencoders learn compressed representations via neural network encoder-decoder pairs. Applications: visualization, noise reduction, preprocessing before supervised learning.

**Density estimation:** model the underlying probability distribution of the data. Useful for anomaly detection (low-density regions are anomalies) and generative modeling (sample from the learned distribution).

**Association rule mining:** find which items co-occur frequently in transactions. Apriori algorithm. Classic application: market basket analysis ("customers who buy X also buy Y").

**Real-world example:** Spotify's music clustering is a canonical unsupervised learning application. Their system analyzes millions of songs across hundreds of audio features (tempo, key, energy, danceability, timbre patterns) without any pre-defined genre labels — and discovers clusters that often align with, but also transcend, human-defined genres. This is how Spotify builds micro-genres and taste profiles that go beyond broad categories like "rock" or "jazz." The clusters emerge from the data; humans didn't define them.

**Key takeaway:** Unsupervised learning is most valuable when you don't know what you're looking for — when you need the data to reveal its own structure. The tradeoff: without labels, there's no objective measure of "correct," making evaluation genuinely hard. Clustering results can't be scored with accuracy; they must be evaluated on downstream utility or through human inspection. This interpretability challenge is the main limitation of unsupervised methods in production.` },
    { id: 7, name: "Semi-Supervised Learning", desc: `Semi-supervised learning occupies the practical middle ground between supervised learning (all data labeled — expensive) and unsupervised learning (no labels — limited utility for many tasks). It leverages a small amount of labeled data alongside a large pool of unlabeled data to train a model that outperforms what the labeled data alone could produce.

**Why it matters:** In most real-world domains, labels are scarce and expensive while raw data is abundant. A hospital might have 500 expert-annotated MRI scans and 50,000 unannotated ones. A sentiment classifier might have 1,000 labeled reviews and 1M unlabeled. Semi-supervised methods extract signal from the unlabeled majority.

**Core techniques:**

**Pseudo-labeling (self-training):** train a model on the labeled data → use it to predict labels for unlabeled data → add high-confidence predictions to the training set as "pseudo-labels" → retrain on the expanded dataset. Iterate. Risk: confident wrong predictions contaminate training.

**Consistency regularization:** the core assumption that small perturbations to an input shouldn't change its true label. Perturb unlabeled examples (noise, augmentation, dropout) and penalize the model when its predictions are inconsistent across perturbations. MixMatch, ReMixMatch, and FixMatch use this principle.

**Graph-based methods:** represent data as a graph where edges connect similar examples. Propagate labels from labeled nodes to unlabeled nodes through the graph structure.

**Co-training:** train two models on complementary views of the data; each model labels examples for the other based on its confident predictions.

**Real-world example:** Google Photos' face recognition uses semi-supervised learning at scale. Users label a small fraction of faces ("this is Sarah") and the system propagates those labels across thousands of unlabeled photos using visual similarity and temporal proximity. A few labels per person enable recognition across an entire photo library — the unlabeled data does most of the work once the labeled anchors are established.

**Key takeaway:** Semi-supervised learning's practical value is reducing the labeling burden without proportionally reducing model quality. The key assumption — that unlabeled data shares the same distribution as labeled data — is critical and often violated. When distribution shift exists between labeled and unlabeled sets, pseudo-labels can mislead more than they help. Always validate semi-supervised models against a clean held-out labeled test set.` },
    { id: 8, name: "Self-Supervised Learning", desc: `Self-supervised learning is the technique that made large-scale AI possible. It generates its own training labels from the structure of the data itself — no human annotation required — and scales naturally with the amount of raw data available. GPT, BERT, CLIP, and every major foundation model are trained primarily via self-supervised objectives.

**The key insight:** Most data contains its own implicit supervision. Text has sequential structure — you can predict the next word from all previous words, and doing so billions of times teaches the model grammar, facts, reasoning patterns, and context. Images have spatial structure — a patch occluded from a photo can be predicted from its surroundings. This implicit structure provides essentially unlimited training signal from unlabeled raw data.

**The main self-supervised objectives:**

**Masked prediction (BERT-style):** randomly mask tokens in a sequence and train the model to predict the masked content from surrounding context. The model must develop a rich understanding of language structure to predict masked words accurately. BERT, RoBERTa, ALBERT all use masked language modeling (MLM).

**Causal/autoregressive prediction (GPT-style):** predict the next token in a sequence given all previous tokens. Train on trillions of tokens of internet text, code, and books. The model develops general knowledge as a byproduct of learning to predict text continuations. GPT-2, GPT-3, GPT-4, LLaMA, and Claude use autoregressive pretraining.

**Contrastive learning (SimCLR, CLIP):** create two augmented views of the same example; train the model to produce similar representations for the two views of the same item and dissimilar representations for different items. CLIP trains on 400M image-text pairs from the web, learning joint representations that enable zero-shot image classification.

**Real-world example:** GPT-3 was trained on ~300B tokens of internet text using next-token prediction — a self-supervised objective so simple it can be stated in one sentence. The model saw no task-specific labels during pretraining. Yet after training, it could answer questions, write code, translate languages, summarize documents, and perform arithmetic — none of which it was explicitly trained for. The implicit structure in language prediction transfers to these tasks because they all require understanding the same underlying patterns.

**Key takeaway:** Self-supervised learning is the reason modern AI scales. Supervised learning's ceiling is the amount of labeled data you can collect; self-supervised learning's ceiling is the amount of raw data that exists — which is effectively unbounded. The tradeoff is that self-supervised representations are general rather than task-specific, requiring fine-tuning or prompting to adapt to particular applications.` },
    { id: 9, name: "Reinforcement Learning (RL)", desc: `Reinforcement learning is the framework for learning through interaction. An agent takes actions in an environment, receives a reward signal based on the outcomes of those actions, and gradually learns a policy — a mapping from states to actions — that maximizes cumulative reward. It's how humans learn many skills, and how AI learns to play games, control robots, and align language models with human preferences.

**The core components:**
- **Agent:** the learner/decision-maker
- **Environment:** everything the agent interacts with (a game, a physical world, a conversation)
- **State (s):** the agent's current observation of the environment
- **Action (a):** what the agent can do
- **Reward (r):** the scalar signal the environment provides after each action — the only feedback the agent gets
- **Policy (π):** the strategy mapping states to actions that the agent is trying to optimize
- **Value function:** the expected cumulative future reward from a given state — the agent's estimate of "how good is it to be here?"

**Key algorithms:**
- **Q-Learning / DQN:** learn the value of each (state, action) pair; choose the action with the highest Q-value. Deep Q-Networks (DQN) used neural networks to handle high-dimensional state spaces — enabling Atari game playing
- **Policy Gradient / PPO:** directly optimize the policy by estimating gradients of expected reward. Proximal Policy Optimization (PPO) is the dominant algorithm for RLHF
- **Actor-Critic:** combine a policy network (actor) with a value estimation network (critic) for more stable training

**RLHF — the critical application:** Reinforcement Learning from Human Feedback is how ChatGPT, Claude, and other modern LLMs are aligned with human preferences. After pretraining, human raters compare model outputs and indicate which are better. A reward model learns those preferences, then PPO fine-tunes the language model to maximize the reward model's scores — steering the model toward helpful, harmless, and honest outputs.

**Real-world example:** DeepMind's AlphaGo (2016) defeated the world Go champion Lee Sedol using RL combined with Monte Carlo Tree Search — a feat considered decades away by experts. AlphaGo Zero (2017) went further: starting from random play with no human game data, training only through self-play RL, it surpassed AlphaGo's performance in 3 days and became the strongest Go player in history within 21 days. The entire knowledge of Go — developed by humans over 2,500 years — was rediscovered and exceeded from scratch via reward signal alone.

**Key takeaway:** RL is the right framework when the correct action isn't known in advance but feedback on outcomes is available — when you can define what "good" looks like but can't enumerate how to achieve it. Its practical challenges are sample inefficiency (requires massive interaction to converge), reward specification (it's easy to optimize the wrong thing), and training instability. For most business ML tasks, supervised learning is more practical — RL's domain is sequential decision-making where interaction and feedback are the primary learning signal.` },
    { id: 10, name: "Transfer Learning", desc: `Transfer learning is the practice of taking a model trained on one task and repurposing it for a different, often related task — rather than training from scratch. It's the foundation of modern AI deployment: virtually every production model starts from a pretrained base rather than random weights.

**Why it works:** Neural networks trained on large, general datasets learn representations — internal encodings of features — that are broadly useful. The early layers of a vision model trained on ImageNet learn to detect edges, colors, and textures. These low-level features are useful for recognizing medical images, satellite photos, and product photos equally well. The task-specific adaptation happens in the later layers, which are fine-tuned on the target domain's (smaller) dataset.

**The two-phase workflow:**
1. **Pretraining:** a large, general model is trained on a broad, large-scale task (image classification on ImageNet; next-token prediction on internet text; protein structure prediction on the PDB). This is compute-intensive, done once, and produces a foundation model
2. **Fine-tuning:** the pretrained model's weights are used as initialization for training on a smaller, task-specific dataset. Learning rates are typically small (to preserve pretrained knowledge) and only some layers may be updated (to prevent catastrophic forgetting)

**Degrees of transfer:**
- **Full fine-tuning:** update all weights on the target task — best performance but requires more data and compute, risks catastrophic forgetting
- **Partial fine-tuning:** freeze early layers (general features), update later layers (task-specific features)
- **Feature extraction:** freeze the entire pretrained model; add a small classification head and train only that. Fastest and lowest-resource, but least flexible
- **Parameter-efficient fine-tuning (PEFT):** LoRA, prefix tuning, adapters — insert small trainable modules into the frozen pretrained model, achieving fine-tuning quality with 1–10% of the parameter updates

**Real-world example:** Hugging Face's ecosystem exists because of transfer learning. BERT (2018) was pretrained on Wikipedia and Books Corpus. Fine-tuning BERT on the Stanford Sentiment Treebank for 3 epochs on a single GPU achieves state-of-the-art sentiment analysis — outperforming models trained from scratch on far larger datasets. This is transfer learning's practical promise: a team with 1,000 labeled examples and a consumer GPU can match what previously required millions of examples and a supercomputer.

**Key takeaway:** Transfer learning is why AI has become accessible. You no longer need Google-scale infrastructure to build a competitive model — you need a good pretrained starting point, a relevant task-specific dataset, and a fine-tuning recipe. The question for any new ML project should be: what's the best available pretrained model for my domain, and how much fine-tuning does it need? Starting from scratch should require a compelling justification.` },
    { id: 11, name: "Feature Engineering", desc: `Feature engineering is the process of transforming raw data into representations that make it easier for a machine learning model to learn the patterns that matter. The model sees only the features you give it — and the quality of those features determines the quality of the model, no matter how sophisticated the algorithm.

**Why it matters more than the algorithm:** Andrew Ng's insight: "Coming up with features is difficult, time-consuming, requires expert knowledge. Applied machine learning is basically feature engineering." In practice, a linear model with excellent features frequently outperforms a deep neural network with poor features. In Kaggle competitions, the winning notebooks spend more time on feature engineering than on model selection.

**Core techniques:**

**Numerical features:**
- **Normalization/standardization:** scale features to comparable ranges (Z-score, min-max) so gradient descent converges faster and distance-based algorithms aren't dominated by large-magnitude features
- **Log transformation:** compress skewed distributions (income, page views) to reduce the influence of extreme values
- **Binning:** convert continuous variables to categorical bins when the relationship with the target is non-linear (e.g., age groups)
- **Polynomial features:** add x², x³, or interaction terms (x₁ × x₂) to capture nonlinear relationships in linear models

**Categorical features:**
- **One-hot encoding:** convert categories to binary vectors. Works well for low-cardinality features
- **Target encoding:** replace a category with the mean target value for that category — powerful but requires careful handling to avoid leakage
- **Embeddings:** learn a dense vector representation for each category, capturing semantic similarity (word embeddings are the canonical example)

**Temporal features:** from datetime fields, extract hour of day, day of week, month, days since last event, rolling means — patterns invisible in raw timestamps

**Domain-specific features:** the highest-value engineering. A fraud detection engineer who knows that "transaction amount ending in .00" is suspicious extracts a feature no generic algorithm would discover from raw data alone.

**Real-world example:** Kaggle's House Prices competition is routinely won with classical models (XGBoost, LightGBM) whose edge comes entirely from feature engineering. Top solutions create hundreds of features: ratios of square footage to lot size, neighborhood mean prices, interaction terms between year built and neighborhood, basement finishing quality scores. A raw linear regression on the original 79 features scores far worse than a thoughtfully engineered feature set fed to a simple model.

**Key takeaway:** Feature engineering matters less as models scale (LLMs essentially learn their own features from raw text) but remains critical for tabular data, time series, and low-data regimes. The guiding principle: encode domain knowledge as features. The model learns correlations; you provide the signal it needs to find them.` },
    { id: 12, name: "Training / Validation / Test Split", desc: `The train/validation/test split is the methodological discipline that separates genuine model performance from overfitting to the data you happened to have. It's the ML equivalent of the scientific method's demand for replication on unseen data — without it, reported accuracy is meaningless.

**The three roles:**

**Training set (~70–80%):** the data the model actually learns from. Weights are updated based on training set loss. The model sees this data repeatedly across many epochs — and will eventually memorize it if training continues long enough.

**Validation set (~10–15%):** data held out during training, used to evaluate performance after each epoch or experiment. Guides decisions about hyperparameters (learning rate, architecture, regularization strength), early stopping (stop training when validation loss stops improving), and model selection (choose the model checkpoint with best validation performance). The model never trains on validation data, but decisions made based on validation performance do influence the final model — meaning validation set performance is still an optimistic estimate.

**Test set (~10–15%):** data locked away until the model is fully trained and all hyperparameter decisions are finalized. Used exactly once — to estimate real-world performance. If you use test set performance to make any further decisions, it becomes a second validation set and your reported test performance is optimistic. "Look at the test set once" is one of the cardinal rules of ML evaluation.

**Cross-validation:** when data is scarce (hundreds of examples rather than thousands), k-fold cross-validation trains and evaluates k different train/validation splits and averages the results — getting a more reliable estimate of generalization performance from limited data. 5-fold and 10-fold are standard.

**Temporal splits for time series:** when data has a time dimension, always split chronologically — train on past, validate and test on future. Random splits allow the model to "cheat" by seeing future information during training (data leakage), producing optimistic results that collapse in production.

**Real-world example:** A team at a healthcare startup trains a diagnostic classifier, tunes it extensively against their test set over many iterations, and reports 94% accuracy. In clinical validation, accuracy drops to 71%. The cause: by using the test set for iterative decision-making, they inadvertently tuned to its specific patterns — their "test set" had become a training set in practice. This contamination is extremely common and one of the main reasons published ML results fail to replicate.

**Key takeaway:** The discipline of the train/validation/test split is about measuring generalization honestly. Every time you use performance data to make a modeling decision, that data's evaluation of the final model is slightly compromised. The test set is a one-time instrument for measuring how well your model generalizes to the real world — treat it accordingly.` },
    { id: 13, name: "Overfitting vs Underfitting", desc: `Overfitting and underfitting are the two failure modes of machine learning models — and navigating between them is the central challenge of model development. Every modeling decision (architecture size, training duration, regularization strength, dataset size) is fundamentally a dial between these two failure modes.

**Overfitting (high variance):** the model learns the training data too well — memorizing noise, spurious correlations, and specific examples rather than general patterns. Performance on training data is high; performance on unseen validation/test data is significantly lower. Signs: training loss is low, validation loss is high and diverging. Cause: model has too much capacity relative to the amount of training data.

**Underfitting (high bias):** the model is too simple to capture the actual patterns in the data. Performance is poor on both training and test data — the model hasn't learned enough. Signs: both training and validation loss are high. Cause: model too constrained (too few parameters, too few layers, too much regularization) or trained for too few epochs.

**The solutions:**

*Reducing overfitting:*
- **More data:** the most reliable fix — more examples means the model must generalize rather than memorize
- **Regularization:** L1/L2 weight penalties, dropout (randomly zero out neurons during training), early stopping (stop training before validation loss diverges)
- **Data augmentation:** artificially expand the training set via transformations (random crops, flips, noise for images; synonym replacement for text)
- **Reduce model capacity:** fewer layers, fewer parameters, simpler architecture

*Reducing underfitting:*
- **More capacity:** deeper or wider network, more parameters
- **Train longer:** more epochs, more gradient updates
- **Reduce regularization:** looser L2 penalty, lower dropout rate
- **Better features:** feature engineering to give the model more signal to learn from

**The double-descent phenomenon:** Deep learning has revealed that the classical bias-variance tradeoff is more nuanced than the textbook picture suggests. With sufficient scale, adding more parameters past the interpolation threshold (where the model fits training data perfectly) can *decrease* test error again — a counterintuitive result that challenges the traditional view of overfitting.

**Real-world example:** In the 2012 ImageNet competition, the winning AlexNet used heavy dropout (rate=0.5) in the fully connected layers — randomly disabling half the neurons during each training pass. This counterintuitive technique prevented overfitting in a network too large for the training data alone to constrain. Without dropout, AlexNet overfit significantly. With it, it generalized to 1,000 image categories with remarkable accuracy. Dropout is now a standard component in nearly every deep learning architecture.

**Key takeaway:** The learning curve — plotting training and validation loss over time — is the primary diagnostic. Converging training and validation loss = healthy generalization. Diverging curves = overfitting. Uniformly high loss = underfitting. This single plot tells you whether to increase or decrease model complexity, regularization, or training data.` },
    { id: 14, name: "Bias-Variance Tradeoff", desc: `The bias-variance tradeoff is the formal statistical framework explaining why overfitting and underfitting happen and how they're connected. It decomposes prediction error into three components that can't all be minimized simultaneously — making it a fundamental constraint on ML model performance.

**The decomposition:** For any model, expected prediction error on new data can be decomposed as:

**Total Error = Bias² + Variance + Irreducible Noise**

- **Bias:** error from incorrect assumptions in the model — how far the model's average prediction is from the true value. A linear model fitting data generated by a quadratic function will always miss — no matter how much training data you add, the linear assumption is wrong. High bias → systematic error → underfitting
- **Variance:** error from sensitivity to fluctuations in the training data — how much the model's predictions change if you train it on a different sample from the same distribution. A very complex model (e.g., a deep tree without pruning) fits one training set differently than another, producing wildly different predictions for the same input. High variance → inconsistency → overfitting
- **Irreducible noise:** the fundamental randomness in the data itself — measurement error, inherently stochastic phenomena. No model, regardless of complexity, can do better than the noise floor

**The tradeoff:** Increasing model complexity reduces bias (the model can capture more complex patterns) but increases variance (the model becomes more sensitive to the specific training data). Decreasing complexity reduces variance but increases bias. There's a sweet spot where total error is minimized.

**Modern nuance:** The classical bias-variance tradeoff describes behavior in traditional statistical models. Modern deep learning at scale behaves differently — in the "overparameterized" regime (more parameters than training examples), models can achieve zero training loss while still generalizing well, contradicting classical theory. Understanding when classical theory applies vs. when the deep learning regime applies is an open research area.

**Real-world example:** A polynomial regression example illustrates cleanly. A degree-1 polynomial (linear) underfits a sinusoidal dataset — high bias, low variance. A degree-15 polynomial fits the training points exactly but oscillates wildly between them — low bias on training data, extreme variance on new data. A degree-4 polynomial finds the sweet spot. Each model type is a different point on the bias-variance tradeoff curve.

**Key takeaway:** The practical implication: when your model performs poorly, the bias-variance decomposition tells you which direction to move. If training error is much lower than validation error → high variance → add regularization, get more data, or simplify the model. If both errors are high → high bias → increase model capacity, train longer, or improve features. Reading the learning curve gives you the diagnosis; bias-variance theory provides the vocabulary.` },
    { id: 15, name: "Gradient Descent", desc: `Gradient descent is the optimization algorithm at the heart of nearly all machine learning. It adjusts a model's parameters iteratively, moving them in the direction that reduces the loss function — the measure of how wrong the model currently is. Everything a neural network learns passes through gradient descent.

**The intuition:** Imagine you're blindfolded on a hilly landscape and want to reach the lowest point. You can feel the slope under your feet. Gradient descent says: take a step in the direction the slope goes downward. Repeat. The "gradient" is the slope — the direction and rate of increase of the loss function with respect to each parameter. Moving against the gradient moves you toward lower loss.

**The update rule:** θ = θ − α × ∇L(θ)
- θ: model parameters (weights and biases)
- α: learning rate — how large a step to take. Too large: overshoot minima, diverge. Too small: converge too slowly or get stuck
- ∇L(θ): gradient of the loss L with respect to parameters θ

**The key variants:**

**Batch gradient descent:** compute the gradient over the entire training dataset before updating. Accurate gradient estimates but extremely slow for large datasets — you process millions of examples before taking a single step.

**Stochastic gradient descent (SGD):** compute gradient and update after every single example. Very fast updates, but noisy — individual examples give poor gradient estimates. The noise can actually help escape local minima.

**Mini-batch gradient descent:** compute gradient on a small random batch (32–256 examples) and update. The standard in practice — balances accuracy and speed. "SGD" in modern ML frameworks typically means mini-batch SGD.

**Adaptive optimizers:**
- **Adam (Adaptive Moment Estimation):** maintains a per-parameter learning rate, adjusting based on first and second moments of gradients. Converges faster than vanilla SGD on most tasks. The default optimizer for most deep learning
- **AdaGrad:** accumulates gradient history; reduces the learning rate for frequently updated parameters. Good for sparse data
- **RMSProp:** similar to AdaGrad but uses a moving average rather than full history — prevents learning rate from decaying too aggressively

**Learning rate schedules:** a fixed learning rate is rarely optimal. Common schedules: cosine annealing (smoothly decrease over training), warmup then decay (start slow, peak, then decrease), cyclical learning rates.

**Real-world example:** Training GPT-3 used Adam with a cosine learning rate schedule over 300B tokens. The learning rate started at zero (warmup over the first 375M tokens), peaked at 6×10⁻⁴, then decayed following a cosine curve. The warmup prevents unstable large updates in the first steps when the gradient estimates are most uncertain. This careful optimization schedule is part of why large model training succeeds at all.

**Key takeaway:** Gradient descent is not magic — it's hill-descending in a very high-dimensional loss landscape, guided by the gradient as a local compass. The practical challenge is that loss landscapes are non-convex (full of local minima and saddle points), stochastic (gradients are estimated from batches), and high-dimensional (modern models have billions of parameters). The surprising finding: despite all these complications, gradient descent reliably finds good solutions in practice — one of the empirical puzzles of deep learning that theory still doesn't fully explain.` },
    { id: 16, name: "Backpropagation", desc: `Backpropagation is the algorithm that makes training deep neural networks possible. It efficiently computes the gradient of the loss function with respect to every parameter in the network — no matter how many layers — by applying the chain rule of calculus in a backward pass through the computation graph.

**The problem it solves:** A neural network with L layers might have millions of parameters. To update each parameter with gradient descent, you need to know: "if I increase this weight by a tiny amount, how much does the loss change?" Computing this for each parameter independently (finite differences) would require a forward pass per parameter — computationally catastrophic. Backpropagation computes all gradients in a single backward pass.

**The mechanics:**
1. **Forward pass:** run the input through the network layer by layer, computing and caching each layer's output and the activation values. Compute the final loss
2. **Backward pass:** starting from the loss, propagate gradients backward using the chain rule: ∂L/∂wᵢ = (∂L/∂output) × (∂output/∂wᵢ). Each layer receives the gradient from the layer above it and passes the gradient to the layer below it after computing its own parameter gradients
3. **Parameter update:** use the computed gradients in a gradient descent step

**The chain rule in practice:** If the loss L depends on layer output y, which depends on parameter w through intermediate activations: ∂L/∂w = (∂L/∂y) × (∂y/∂w). Chain these together across all layers and you get the gradient of the loss with respect to any parameter deep in the network.

**The vanishing gradient problem:** Backpropagation multiplies gradients through many layers via the chain rule. If each layer's gradient is less than 1 (which happens with sigmoid activations), the product shrinks exponentially — gradients in early layers become vanishingly small, those layers stop learning. This was the fundamental obstacle that blocked deep learning until: (1) ReLU activations (gradient is either 0 or 1, doesn't shrink), (2) residual connections (gradients can flow directly around layers), and (3) batch normalization (keeps activations in a well-scaled range).

**Real-world example:** The 1986 Rumelhart, Hinton & Williams paper introducing backpropagation for neural networks is one of the most cited papers in computer science. But the algorithm's practical impact was limited for decades by the vanishing gradient problem and insufficient compute. The 2012 deep learning renaissance — enabled by ReLU activations and GPUs — was essentially the problem of applying backpropagation at scale finally being solved.

**Key takeaway:** Backpropagation is automatic differentiation applied to computation graphs. Modern deep learning frameworks (PyTorch, JAX, TensorFlow) implement "autograd" — automatic computation of gradients for any differentiable operation — so practitioners rarely implement backpropagation manually. But understanding it is essential for debugging training issues: vanishing gradients, exploding gradients, and dead neurons (ReLU units that never activate) all have explanations rooted in how backpropagation flows through the network.` },
    { id: 17, name: "Loss Functions", desc: `A loss function (also called a cost function or objective function) is the mathematical expression that measures how wrong a model's predictions are relative to the true values. It's what gradient descent minimizes — and the choice of loss function encodes what "good performance" means for your specific task.

**The principle:** The model optimizes exactly what you tell it to optimize. Choose the wrong loss function and the model will find solutions that score well on the metric you defined while completely missing what you actually care about. Loss function design is therefore a problem of specification: formally expressing your true objective in a differentiable mathematical form.

**Classification losses:**
- **Binary cross-entropy:** for two classes. Heavily penalizes confident wrong predictions (predicting 0.99 for the wrong class). L = −[y log(ŷ) + (1−y) log(1−ŷ)]. Standard for binary classifiers
- **Categorical cross-entropy:** multi-class generalization. L = −Σ yᵢ log(ŷᵢ). Standard for softmax classifiers
- **Focal loss:** modification of cross-entropy that down-weights easy examples and focuses training on hard, misclassified examples. Designed for class-imbalanced datasets (RetinaNet object detector)

**Regression losses:**
- **MSE (Mean Squared Error):** L = (1/n) Σ(y−ŷ)². Penalizes large errors quadratically — sensitive to outliers. When you want to strongly penalize large deviations
- **MAE (Mean Absolute Error):** L = (1/n) Σ|y−ŷ|. Penalizes all errors linearly — more robust to outliers. But not differentiable at zero (minor issue in practice)
- **Huber loss:** MSE for small errors, MAE for large errors — combining the best of both. Robust to outliers while being smooth and differentiable

**Specialized losses:**
- **Contrastive loss / Triplet loss:** for learning embeddings where similar items should be close and dissimilar items should be far in embedding space. Face recognition, semantic search
- **KL divergence:** measures the difference between two probability distributions. Used in VAEs and knowledge distillation
- **RLHF reward modeling:** a learned loss function — a neural network trained to score outputs by human preferences

**Real-world example:** Early object detection models used MSE loss on bounding box coordinates — treating every coordinate equally. This caused problems: a small error in the center of a large box and a large error in the center of a small box produce different amounts of visual overlap, but identical MSE. IoU loss (Intersection over Union) directly optimizes the actual detection quality metric, leading to dramatically better detection performance. Switching loss functions — with no architecture changes — improved mAP on COCO by several percentage points.

**Key takeaway:** The loss function is the model's entire world — it knows nothing about your business objective except what the loss encodes. If you optimize cross-entropy, you get a well-calibrated classifier. If you optimize MSE on click probability, you get a model that's good at predicting clicks regardless of whether those clicks lead to purchases. The discipline is ensuring the loss function genuinely measures what you want — and if it doesn't, designing one that does.` },
    { id: 18, name: "Hyperparameter Tuning", desc: `Hyperparameters are the configuration choices that govern how a model learns — they are set before training begins and are not updated by gradient descent. The difference between a model that achieves 70% accuracy and one that achieves 90% on the same data is often not the algorithm but the hyperparameters that control it.

**Parameters vs. hyperparameters:**
- **Parameters:** learned from data during training — weights, biases, attention matrices. Optimized by gradient descent
- **Hyperparameters:** set by the practitioner before training — not learned from the training data. Examples: learning rate, batch size, number of layers, hidden layer width, dropout rate, weight decay, number of epochs, optimizer choice, learning rate schedule

**Why hyperparameter tuning matters:** The learning rate alone can determine whether a model converges at all. Too high: loss oscillates or diverges. Too low: training takes 100× longer or gets stuck. The optimal learning rate varies by model architecture, batch size, and dataset — there's no universal answer, only empirical search.

**Tuning strategies:**

**Grid search:** define a set of candidate values for each hyperparameter; try all combinations. Guaranteed to find the best configuration in the grid. Scales exponentially with the number of hyperparameters — practical only for 1–2 hyperparameters.

**Random search:** sample configurations randomly from the hyperparameter space. Empirically more efficient than grid search for high-dimensional spaces — because most hyperparameters have low impact, and random search spends less time on the irrelevant dimensions (Bergstra & Bengio, 2012).

**Bayesian optimization (Optuna, HyperOpt):** model the relationship between hyperparameter configurations and validation performance, using the model to select promising configurations to evaluate next. More efficient than random search — focuses trials on the regions of the search space where good configurations are likely. Optuna's TPE (Tree-structured Parzen Estimator) is the standard implementation.

**Population-based training (PBT):** run a population of models in parallel, periodically copy the weights of well-performing models into poorly-performing ones and mutate their hyperparameters. Combines the benefits of parallel exploration with adaptive scheduling. DeepMind uses PBT for training large models.

**Learning rate finders:** rather than searching for the learning rate, use the one-cycle LR finder (Leslie Smith): increase the learning rate from a very small value, plot loss vs. LR, and pick the LR just before loss starts to increase. Finds a good LR in a single pass through the data.

**Real-world example:** In practice, the learning rate is by far the most impactful hyperparameter. OpenAI's GPT-3 training paper reports extensive ablations showing that learning rate schedule (warmup + cosine decay) had larger impact on final model quality than architectural choices like attention head count. Andrej Karpathy's "Neural Network: Zero to Hero" series emphasizes that "the most important hyperparameter is the learning rate" — and demonstrates empirically that a 10× change in LR converts a converging run into a diverging one.

**Key takeaway:** Hyperparameter tuning is not optional polish — it's often the largest lever between a proof-of-concept and a production model. Start with the learning rate: it's the most sensitive, most impactful hyperparameter in almost all settings. Then batch size (affects gradient noise and convergence), then regularization (dropout, weight decay), then architecture depth and width. Use Bayesian optimization (Optuna) for systematic search — it beats both grid and random search with fewer trials.` },
  ],
};
export default foundations;
