const classicalMl = {
  name: "Classical ML Algorithms",
  icon: "⬡",
  color: "#3B82F6",
  concepts: [
    { id: 19, name: "Linear Regression", desc: `Linear regression is the simplest and most interpretable supervised learning algorithm — a model that predicts a continuous output as a weighted sum of input features. Its simplicity makes it fast, interpretable, and a critical baseline: if a linear model can't find signal in your data, something is fundamentally wrong before you try anything more complex.

**The model:** ŷ = w₁x₁ + w₂x₂ + ... + wₙxₙ + b

Each weight wᵢ represents the change in the predicted output per unit change in feature xᵢ, holding all other features constant. The bias b is the intercept. Training finds the weights that minimize the sum of squared residuals (SSR) between predictions and true values — this has a closed-form analytical solution (the Normal Equation: w = (XᵀX)⁻¹Xᵀy) for small datasets, or is solved with gradient descent for large ones.

**The four key assumptions (LINE):**
- **L**inearity: the relationship between features and target is linear. Violated by inherently nonlinear patterns (use polynomial features or a nonlinear model)
- **I**ndependence: observations are independent of each other. Violated by time series data without proper handling
- **N**ormality: residuals are normally distributed. Required for valid statistical inference (p-values, confidence intervals), less critical for pure prediction
- **E**qual variance (homoscedasticity): residual variance is constant across the range of predictions. Violated when errors are larger for larger predictions (common in financial data)

**Regularization variants:**
- **Ridge (L2):** adds λΣwᵢ² penalty — shrinks all weights toward zero, handles multicollinearity, rarely zeros out features
- **Lasso (L1):** adds λΣ|wᵢ| penalty — produces sparse solutions, can zero out irrelevant features entirely (automatic feature selection)
- **Elastic Net:** combines L1 and L2 penalties — balances sparsity and multicollinearity handling

**Real-world example:** Zillow's Zestimate home valuation model started as a linear regression on features like square footage, bedrooms, bathrooms, location, and comparable sales. The linear model is still a critical component in their ensemble — it provides an interpretable baseline that humans can reason about, and its coefficients give useful domain insights (e.g., the dollar value of an additional bathroom in a given zip code). The model's interpretability is a feature, not a limitation: regulators and consumers can understand why a valuation was produced.

**Key takeaway:** Always try linear regression first. If it performs well, you have an interpretable, fast, and easy-to-maintain model. If it performs poorly, the residual analysis tells you exactly which assumptions are violated and which direction to move — polynomial features for nonlinearity, regularization for high dimensions, robust regression for outliers. Linear regression is the diagnostic tool that informs all subsequent modeling decisions.` },
    { id: 20, name: "Logistic Regression", desc: `Despite the name, logistic regression is a classification algorithm — one of the most widely deployed models in production. It predicts the probability that an input belongs to a class and is particularly valued for its interpretability: the model's reasoning can be examined, challenged, and explained, which matters enormously in regulated industries.

**The model:** logistic regression applies the sigmoid function to a linear combination of features:

P(y=1 | x) = σ(w·x + b) = 1 / (1 + e^(−(w·x+b)))

The sigmoid squashes any real-valued score into (0, 1), making the output a probability. The decision boundary is where the score equals 0 — a linear boundary in feature space. For multi-class problems, softmax generalization (multinomial logistic regression) extends this to K classes.

**Training:** Logistic regression minimizes binary cross-entropy loss (log loss): L = −[y log(ŷ) + (1−y) log(1−ŷ)]. Unlike linear regression, there's no closed-form solution for the weights — training uses gradient descent or more efficient second-order methods (L-BFGS).

**Interpreting coefficients:** The weight wᵢ represents the change in log-odds of the positive class per unit change in feature xᵢ. Equivalently, e^wᵢ is the odds ratio — how much the odds multiply per unit increase. A weight of 0.7 on "age" means each additional year multiplies the odds of the outcome by e^0.7 ≈ 2.01. This direct interpretability is why logistic regression remains the standard in clinical medicine, credit scoring, and legal settings where explainability is required.

**When it works well:** linearly separable or nearly-separable classes; high-dimensional sparse data (text, one-hot encoded categoricals); when probability calibration and interpretability matter; as a fast, reliable baseline before trying complex models.

**When it struggles:** highly nonlinear decision boundaries; complex feature interactions not captured by linear combinations; very high-capacity tasks where deep learning's representation learning is needed.

**Real-world example:** FICO credit scoring — the industry standard for consumer credit — is built on logistic regression principles applied to payment history, credit utilization, account age, and credit mix. The model's interpretability is legally mandated: lenders must provide specific reasons for credit denials (adverse action notices), which requires a model whose feature contributions can be enumerated. A black-box deep neural network, however accurate, cannot satisfy this regulatory requirement.

**Key takeaway:** Logistic regression is the right default classifier: fast to train, fast to infer, well-understood, and interpretable. Before using a complex ensemble or neural network, establish a logistic regression baseline. If your complex model barely outperforms logistic regression, the complexity is probably not justified. If it dramatically outperforms it, the gap quantifies exactly how much nonlinearity or feature interaction is present in your problem.` },
    { id: 21, name: "Decision Trees", desc: `A decision tree is a model that makes predictions by asking a sequence of yes/no questions about the input features, following a path from the root to a leaf. It's the most naturally interpretable ML model — the decision logic can be printed as human-readable rules — and the conceptual foundation of every major ensemble method in use today.

**How trees are built (CART algorithm):**
1. At each node, search all features and all possible thresholds for the split that best separates the target variable
2. "Best" is measured by **Gini impurity** (probability that a randomly chosen sample from the node would be misclassified if labeled by the node's class distribution) or **information gain** (reduction in entropy after the split)
3. Recursively split each child node until a stopping criterion is met: maximum depth, minimum samples per leaf, or no further impurity reduction is possible
4. Each leaf node holds the majority class (classification) or mean value (regression) of its training samples

**The overfitting problem:** An unpruned tree will grow until it perfectly memorizes every training example — producing a model that achieves 100% training accuracy and poor generalization. A single leaf per training example is the extreme case. Countermeasures: maximum depth constraints, minimum samples per split, minimum samples per leaf, or post-training pruning (remove branches that don't improve held-out performance).

**Why trees are valuable beyond their direct use:**
- They handle mixed data types naturally (numeric and categorical features, no normalization needed)
- They're invariant to monotonic feature transformations (log scaling, standardization have no effect)
- They capture nonlinear relationships and feature interactions without explicit specification
- They naturally handle missing values (train surrogate splits)
- They provide feature importance scores based on total impurity reduction

**Real-world example:** Medical decision trees are used in emergency triage. The CURB-65 score for pneumonia severity, while not ML-generated, has exactly the structure of a decision tree: a sequence of binary splits on clinical features (Confusion, Urea, Respiratory rate, Blood pressure, age ≥65) producing risk categories. ML-generated trees in clinical settings must be interpretable for physician trust and liability — and decision trees are the natural format.

**Key takeaway:** Decision trees shine when interpretability is required and the decision logic needs to be auditable. Their weakness — high variance (small data changes produce very different trees) — is exactly what Random Forest and Gradient Boosting address. Think of the single decision tree as the atomic unit of ML's most powerful algorithms, not as a production model in its own right.` },
    { id: 22, name: "Random Forest", desc: `Random Forest is the ensemble method that turned decision trees from overfit memorizers into robust generalizers. By training hundreds of trees on different random subsets of data and features, then aggregating their predictions, Random Forest reduces the variance that makes individual trees unreliable — without increasing bias.

**The two sources of randomness (hence "random"):**

**1. Bootstrap aggregating (bagging):** each tree is trained on a bootstrap sample — a random sample drawn with replacement from the training data, equal in size to the original dataset. On average, each bootstrap sample contains ~63.2% of the original examples (some appear multiple times, others not at all). The ~36.8% of examples not included in a tree's training set are its **out-of-bag (OOB) samples** — a built-in validation set that provides unbiased performance estimates without a held-out set.

**2. Feature subsampling:** at each split in each tree, only a random subset of features is considered (typically √p for classification, p/3 for regression, where p is total features). This forces each tree to develop different specializations rather than all finding the same dominant features — dramatically decorrelating the trees so their errors don't all correlate.

**Prediction aggregation:**
- Classification: majority vote across all trees
- Regression: mean prediction across all trees

**What Random Forest handles well:** missing values (train without them, predict surrogate paths), mixed feature types (numeric and categorical), high-dimensional data, nonlinear relationships, feature interactions. It's robust — performance degrades gracefully as hyperparameters move away from optimal.

**Feature importance:** For each feature, measure the total reduction in impurity it causes across all splits in all trees. Normalized across features, this produces a variable importance ranking — a useful diagnostic even when the model itself isn't used for final prediction.

**Real-world example:** Sentinel-2 satellite imagery land cover classification — used by the European Space Agency to map vegetation, water, urban areas, and agriculture across Europe — uses Random Forest on multispectral imagery. The model processes hundreds of millions of pixels, each described by 12 spectral bands plus derived features. Random Forest's robustness to feature noise, ability to handle mixed spectral characteristics, and built-in OOB error estimates make it the practical choice over more complex deep learning pipelines for this well-characterized, moderately-sized feature space.

**Key takeaway:** Random Forest should be your first non-linear model after establishing linear baselines. It requires minimal hyperparameter tuning (mainly n_estimators and max_features), is parallelizable, and provides OOB error estimates for free. It rarely overfits badly and degrades gracefully. The main limitation: it's slow at prediction time for very large forests, and it can be outperformed by gradient boosting on tabular data when carefully tuned.` },
    { id: 23, name: "Gradient Boosting (XGBoost / LightGBM / CatBoost)", desc: `Gradient boosting is the dominant algorithm for structured/tabular data — the standard approach in data science competitions and production ML pipelines for predicting on rows and columns. Where Random Forest builds trees independently and averages them, gradient boosting builds trees sequentially: each tree corrects the errors of the ensemble so far.

**The core algorithm:**
1. Initialize with a constant prediction (the mean of the target)
2. Compute residuals: the differences between true values and current predictions
3. Train a new (typically shallow) tree to predict those residuals
4. Add the new tree to the ensemble, scaled by a learning rate η: F(x) = F(x) + η × tree(x)
5. Recompute residuals and repeat for T iterations

The key insight: fitting each tree to the residuals of the current ensemble is equivalent to performing gradient descent in function space — each tree is a gradient step that moves the ensemble predictions toward lower loss. This is why it's called gradient boosting: you're boosting performance by following the gradient.

**The three major implementations:**

**XGBoost (Chen & Guestrin, 2016):** Added L1/L2 regularization to the tree-building objective (preventing overfitting), second-order Taylor approximation of the loss (more accurate gradient estimates), column and row subsampling (like Random Forest, further reducing variance), and aggressive cache-aware computation. Became the dominant Kaggle algorithm almost immediately.

**LightGBM (Microsoft, 2017):** Dramatically faster than XGBoost on large datasets through two innovations: **Gradient-based One-Side Sampling (GOSS)** — keep all high-gradient samples (the ones with large errors) but subsample low-gradient samples, preserving information density while reducing data size; **Exclusive Feature Bundling (EFB)** — combine mutually exclusive sparse features into a single bundle, reducing feature count without information loss. LightGBM also uses leaf-wise (best-first) tree growth rather than depth-first, finding more impactful splits.

**CatBoost (Yandex, 2017):** Addresses the most common gradient boosting weakness: categorical features. Traditional approaches require preprocessing (label encoding introduces ordering artifacts; one-hot encoding explodes dimensionality). CatBoost implements **ordered target statistics** — a permutation-based method that computes target encodings without leakage — enabling direct handling of high-cardinality categoricals. Also uses symmetric (oblivious) trees that are fast to evaluate and less prone to overfitting.

**Real-world example:** In the 2016 Higgs boson ML challenge on Kaggle, gradient boosting (specifically XGBoost) achieved top performance on a physics classification problem with 11M training examples and 30 features — outperforming neural networks specifically designed for the task. More practically: every major ride-sharing, e-commerce, and financial services company uses gradient boosting for real-time fraud detection, surge pricing, and credit risk models — because it delivers top accuracy on tabular data with manageable training time and interpretable feature importances.

**Key takeaway:** For tabular data (the majority of real-world ML problems), gradient boosting — specifically XGBoost, LightGBM, or CatBoost — is the algorithm to beat. LightGBM for large datasets and speed; CatBoost when categorical features are prevalent; XGBoost when maximum compatibility and community support matter. The critical hyperparameters: number of trees (n_estimators), learning rate (shrinkage), tree depth (max_depth), and subsampling rates. Use early stopping on a validation set to find the optimal n_estimators automatically.` },
    { id: 24, name: "Support Vector Machines (SVM)", desc: `Support Vector Machines find the decision boundary that maximizes the margin — the distance between the boundary and the nearest training examples of each class. This maximum-margin principle gives SVMs strong theoretical guarantees and exceptional generalization in high-dimensional spaces, which is why they dominated ML benchmarks from the mid-1990s through the mid-2000s.

**The geometry:** For a linearly separable binary classification problem in d dimensions, infinitely many hyperplanes can separate the two classes. SVM finds the unique hyperplane that maximizes the margin — the width of the "safety buffer" between classes. Points that lie exactly on the margin boundaries are the **support vectors** — the only training examples that matter for defining the boundary. Change any non-support-vector example and the boundary doesn't move.

**The math:** SVM solves the optimization: minimize ½||w||² subject to yᵢ(w·xᵢ + b) ≥ 1 for all training examples. This is a convex quadratic program with a unique global solution — no local minima, unlike neural network training.

**Soft-margin SVM (C parameter):** Real data is rarely linearly separable. Soft-margin SVM introduces slack variables that allow some misclassifications, controlled by hyperparameter C:
- High C: small tolerance for misclassification → narrower margin, more complex boundary, higher overfitting risk
- Low C: more tolerance → wider margin, simpler boundary, more regularization

**The kernel trick — the key capability:** Directly learning a nonlinear boundary in the original feature space is hard. Instead, SVMs implicitly map data to a higher-dimensional feature space where a linear boundary works, using a **kernel function** K(xᵢ, xⱼ) that computes inner products in the transformed space without explicitly constructing it:
- **RBF (Radial Basis Function / Gaussian):** K(x, z) = exp(−γ||x−z||²). The most common kernel — creates smooth, circular decision boundaries. γ controls how locally the model fits
- **Polynomial:** K(x, z) = (x·z + c)^d — captures polynomial feature interactions
- **Linear:** K(x, z) = x·z — equivalent to linear SVM, efficient for high-dimensional sparse data (text)

**Real-world example:** SVMs were the state of the art for text classification and bioinformatics throughout the 2000s. In genomics, SVMs on gene expression microarray data (20,000+ features, hundreds of samples) predicted cancer subtypes with then-unprecedented accuracy. The high-dimensional sparse nature of gene expression data (many features, relatively few correlated) is exactly where SVM's maximum-margin principle shines — the model finds the few genes that best separate classes even in this extreme dimensionality.

**Key takeaway:** SVMs are still valuable for high-dimensional sparse data (text with TF-IDF features, genomics), small-to-medium datasets where kernel methods are tractable, and problems where a convex optimization with guaranteed convergence is preferred over neural network training's stochastic complexity. Their main limitation is scalability: training complexity is O(n²) to O(n³) in the number of samples, making them impractical for datasets above ~100K examples. For large-scale problems, gradient boosting (tabular) or neural networks (images, text) are the modern default.` },
    { id: 25, name: "K-Nearest Neighbors (KNN)", desc: `K-Nearest Neighbors is the most literal instantiation of the intuition that "similar inputs should produce similar outputs." It makes predictions without learning any explicit model — instead, it finds the K most similar training examples to a new query and aggregates their labels. Its simplicity makes it a useful baseline and a revealing lens on what "similarity" means in your data.

**The algorithm:**
1. Store all training examples (no "training" computation — KNN is a lazy learner)
2. Given a new query point, compute its distance to every training example
3. Find the K nearest neighbors (smallest distances)
4. Classification: return the majority class among the K neighbors. Regression: return the mean value
5. Prediction complete — no model parameters, no learned weights

**Distance metrics:**
- **Euclidean distance:** √Σ(xᵢ−yᵢ)² — straight-line distance, the default. Sensitive to scale — features with larger ranges dominate. Always normalize before using Euclidean distance
- **Manhattan distance:** Σ|xᵢ−yᵢ| — sum of absolute differences, less sensitive to outliers
- **Cosine similarity:** 1 − (x·y / ||x||·||y||) — measures the angle between vectors. Ideal for text and high-dimensional sparse data where magnitude is less meaningful than direction
- **Hamming distance:** for categorical or binary features

**The K hyperparameter:**
- K=1: maximum flexibility — the nearest neighbor wins. High variance, sensitive to noise and outliers
- Large K: smoother decision boundary, more bias toward the majority class, less sensitive to individual noisy points
- Optimal K is typically found via cross-validation; odd K values avoid ties in binary classification

**The curse of dimensionality:** KNN's core weakness. In high dimensions, distances between points become increasingly uniform — the nearest neighbor is barely closer than the farthest. With 100+ features, KNN loses discriminative power unless dimensionality reduction (PCA, embedding) is applied first. The algorithm that works intuitively in 2D breaks down empirically in 100D.

**Computational cost:** O(1) training (just store data), O(nd) prediction (compute n distances in d dimensions). For large datasets, this makes prediction slow. Approximate nearest neighbor search (FAISS, Annoy, HNSW) enables fast KNN at scale — making it the foundation of modern vector databases and semantic search systems.

**Real-world example:** Spotify's "song radio" and collaborative filtering recommendations are KNN at scale. Given your listening history, the system finds users whose listening patterns are most similar (nearest neighbors in behavior space) and recommends what those similar users listened to next. FAISS (Facebook AI Similarity Search) enables this at 400M+ song and 500M+ user scale in milliseconds by building approximate nearest-neighbor indexes rather than exhaustive search.

**Key takeaway:** KNN is valuable as a non-parametric baseline and for understanding the geometry of your feature space. If KNN performs well, your data has clear local structure that distance metrics can exploit. Its practical uses in production are primarily in recommendation systems and semantic search — but via approximate nearest neighbor algorithms that make the core idea tractable at scale. Always normalize features before applying KNN; always reduce dimensionality for high-dimensional inputs.` },
    { id: 26, name: "Naive Bayes", desc: `Naive Bayes is a probabilistic classifier that applies Bayes' theorem with one bold simplifying assumption: all features are conditionally independent given the class. This "naive" assumption is almost never true in practice — yet the classifier often works surprisingly well, particularly on text. Its speed and probabilistic outputs make it a strong baseline in NLP.

**The math:** Bayes' theorem: P(class | features) ∝ P(features | class) × P(class)

- P(class): the prior — how frequent is this class in the training data?
- P(features | class): the likelihood — how probable are these feature values given this class?
- The "naive" step: assume features are independent given the class, so P(features | class) = ∏ P(featureᵢ | class) — multiply individual feature likelihoods

Predict the class that maximizes this product. In log space (to avoid underflow from multiplying many small probabilities): argmax_class [log P(class) + Σᵢ log P(featureᵢ | class)]

**Three variants for different feature types:**

**Multinomial Naive Bayes:** features are word counts or term frequencies. Each P(wordᵢ | class) is the relative frequency of that word in documents of that class. The standard for text classification — spam filtering, sentiment analysis, topic classification.

**Gaussian Naive Bayes:** features are continuous and assumed to follow a Gaussian distribution within each class. Estimates mean and variance per feature per class from training data. Works when features are roughly normally distributed.

**Bernoulli Naive Bayes:** features are binary (word present/absent). Similar to Multinomial but models presence/absence rather than count. Sometimes outperforms Multinomial on very short texts.

**Laplace smoothing:** without smoothing, a word that appears in test data but never in training data for a class gives P(word | class) = 0, zeroing out the entire product. Laplace smoothing adds a pseudocount of 1 to every word count, ensuring no zero probabilities: P(wordᵢ | class) = (count(wordᵢ, class) + 1) / (total_words_in_class + vocabulary_size).

**Real-world example:** Paul Graham's 2002 essay "A Plan for Spam" described the first widely-deployed Naive Bayes spam filter. The model trained on a personal email corpus, computing P(spam | word) for each word in the vocabulary. Despite the crude independence assumption — spam words clearly aren't independent — the classifier achieved ~99.5% accuracy on his personal email. The algorithm's robustness to the violated independence assumption is because: even when features aren't independent, the maximum-a-posteriori class decision is often still correct, even if the probability estimates are poorly calibrated.

**Key takeaway:** Use Naive Bayes when you need a fast, interpretable probabilistic classifier on text data with limited training examples. Its speed enables real-time classification at very high throughput. Its weakness is that it doesn't model feature interactions — "not good" has the same representation as "good" in terms of word presence. For complex language understanding, modern neural models are far superior. For fast, high-volume text categorization on clearly defined classes, Naive Bayes remains competitive and dramatically simpler to operate.` },
    { id: 27, name: "K-Means Clustering", desc: `K-Means is the most widely used clustering algorithm — an iterative procedure that partitions data into K groups by minimizing the total within-cluster variance. It's fast, scalable, and intuitive, making it the default first approach for any unsupervised grouping problem.

**The algorithm:**
1. Initialize K centroids (randomly, or with K-Means++ for better initialization)
2. **Assignment step:** assign each data point to the nearest centroid (Euclidean distance)
3. **Update step:** recompute each centroid as the mean of all points assigned to it
4. Repeat steps 2–3 until assignments no longer change (convergence) or a maximum iteration count is reached

The objective function being minimized is the **within-cluster sum of squares (WCSS):** Σₖ Σₓ∈Cₖ ||x − μₖ||²

K-Means is guaranteed to converge but not to find the global minimum — it finds a local minimum that depends on initialization. This is why K-Means++ (choosing initial centroids with probability proportional to distance from already-chosen centroids) dramatically improves results: better initialization → better local minima.

**Choosing K — the elbow method:** Plot WCSS against K. As K increases, WCSS decreases (more clusters → tighter clusters). The "elbow" in the curve — where adding another cluster gives diminishing returns — suggests the natural number of clusters. More rigorous: the Silhouette score measures how similar each point is to its own cluster versus neighboring clusters (range: −1 to 1, higher is better).

**K-Means limitations:**
- Requires specifying K in advance
- Assumes spherical, equal-sized clusters (breaks on elongated or irregularly shaped clusters)
- Sensitive to outliers (outliers pull centroids away from true cluster centers)
- Doesn't handle categorical features (distance is undefined for categories)

**Alternatives for K-Means' weaknesses:**
- **K-Means++:** better initialization, same algorithm
- **DBSCAN:** density-based, finds arbitrarily shaped clusters, automatically detects noise/outliers, doesn't require K
- **HDBSCAN:** hierarchical extension of DBSCAN, handles varying cluster densities
- **Gaussian Mixture Models (GMM):** soft cluster assignments (each point has a probability of belonging to each cluster), handles elliptical clusters

**Real-world example:** Netflix uses K-Means on viewing behavior vectors to create audience segments — clusters of users with similar taste profiles. These clusters power content licensing decisions, trailer editing choices, and thumbnail A/B testing. The "artwork personalization" feature (showing different thumbnails for the same title to different users) relies on K-Means clusters: users in the "action fan" cluster see the fight scene thumbnail, users in the "romance fan" cluster see the lead characters. Netflix reports this personalization improved click-through rates by 20–30%.

**Key takeaway:** K-Means is the right default when you need fast, scalable clustering of numeric data with roughly spherical clusters and a roughly known K. For production use: always run multiple initializations and pick the best result (scikit-learn's init='k-means++', n_init=10 handles this automatically). Use the elbow method and silhouette scores to validate K. For irregularly shaped clusters or unknown noise levels, HDBSCAN is usually more appropriate.` },
    { id: 28, name: "Principal Component Analysis (PCA)", desc: `PCA is the most fundamental dimensionality reduction technique — a linear transformation that finds the directions of maximum variance in the data and projects the data onto a lower-dimensional space defined by those directions. It's both a practical preprocessing tool and a conceptual lens for understanding the intrinsic structure of high-dimensional data.

**The intuition:** High-dimensional data often has much lower intrinsic dimensionality — many features are correlated, meaning the data actually lives on a lower-dimensional manifold embedded in high-dimensional space. PCA finds the axes of this manifold (principal components) and lets you work in that lower-dimensional space with minimal information loss.

**The math:**
1. Center the data: subtract the mean from each feature
2. Compute the **covariance matrix:** C = (1/n) XᵀX, capturing how features vary together
3. Compute the **eigendecomposition** of C: eigenvectors are the principal component directions; eigenvalues are the variance explained along each direction
4. Sort eigenvectors by eigenvalue (descending) — the first principal component explains the most variance
5. Project data onto the top k eigenvectors: X_reduced = X × V_k (where V_k is the matrix of top-k eigenvectors)

In practice, **Singular Value Decomposition (SVD)** is used instead of explicit eigendecomposition — numerically more stable: X = UΣVᵀ. The columns of V are the principal components.

**How much variance to retain:** Plot the **scree plot** (explained variance vs. component number). A common rule: retain enough components to explain 95% of total variance. Alternatively, retain components where the eigenvalue is above 1.0 (Kaiser criterion).

**PCA assumptions and limitations:**
- Linear: PCA finds linear combinations of features. For nonlinear structure, kernel PCA or UMAP/t-SNE are more appropriate
- Scale-sensitive: features with larger variance dominate. Always standardize (zero mean, unit variance) before PCA unless features are already on the same scale
- Interpretability loss: principal components are linear combinations of original features — they're rarely as interpretable as the original features themselves

**Real-world example:** In face recognition, the "Eigenfaces" approach (Turk & Pentland, 1991) applies PCA to a dataset of face images (each image is a high-dimensional vector of pixel values). The top principal components — "eigenfaces" — capture the dominant modes of variation across faces: overall brightness, face orientation, presence of glasses, hair color patterns. Representing faces as coordinates in eigenface space (a 50–100 dimensional space instead of 100K pixel space) enables fast recognition via nearest-neighbor search. Despite being conceptually simple, eigenfaces achieved state-of-the-art face recognition for a decade.

**Key takeaway:** PCA is a standard preprocessing step for any high-dimensional dataset: it decorrelates features (eliminating multicollinearity issues for linear models), reduces computational cost of downstream algorithms, and enables 2D/3D visualization of high-dimensional data. Its primary limitations are linearity (real data often has nonlinear structure) and interpretability loss (the components don't correspond to original features). For visualization specifically, t-SNE and UMAP typically produce more informative 2D embeddings than PCA.` },
    { id: 29, name: "Ensemble Methods", desc: `Ensemble methods combine multiple models to produce predictions better than any individual model alone. The core insight — formalized by Francis Galton's 1907 "wisdom of crowds" observation — is that combining independent imperfect estimators averages out their errors, producing a more reliable aggregate prediction.

**Why ensembles work — the bias-variance lens:**
- **Bagging (Bootstrap Aggregating):** reduces variance. Train multiple high-variance models (deep trees) on different bootstrap samples; average their predictions. Each model overfits differently, so errors partially cancel. Random Forest is bagging applied to decision trees with additional feature randomization
- **Boosting:** reduces bias. Train models sequentially, each correcting the errors of the previous ensemble. Each weak learner has high bias; the sequence converges to a low-bias ensemble. Gradient Boosting, AdaBoost, XGBoost
- **Stacking (Stacked Generalization):** trains a meta-learner on the outputs of base models. Base models (diverse: SVM, Random Forest, neural network) make predictions; a second-level model learns to weight and combine them. Most powerful but computationally expensive and requires careful cross-validation to avoid leakage

**Diversity is the key:** Ensembles only help if the member models make different errors. An ensemble of five identical models isn't an ensemble — it's just one model with extra compute. Diversity comes from: different algorithms (SVM + tree + linear model), different hyperparameters, different feature subsets, different training data subsets (bagging), or different random seeds.

**Voting and averaging:**
- Hard voting (classification): each model votes for a class, majority wins
- Soft voting: average the class probabilities, predict the class with highest average probability (generally better — uses confidence information)
- Regression: simple average, weighted average, or median (robust to outlier predictions)

**Real-world example:** The Netflix Prize (2006–2009) offered $1M for a 10% improvement in recommendation accuracy over Netflix's baseline. The winning solution used an ensemble of hundreds of models including matrix factorization variants, neighborhood methods, restricted Boltzmann machines, and regression trees — blended by a stacking meta-learner. No single model came close to the 10% threshold; the final winning entry achieved 10.06% improvement, and the margin of victory over second place was 20 minutes of additional ensemble development. The prize demonstrated that ensembling different modeling approaches is often more powerful than optimizing any single model.

**Key takeaway:** Whenever your goal is maximizing predictive accuracy on a fixed dataset, an ensemble will almost always outperform your best single model. The practical question is the cost-benefit: ensembles require more compute at training and inference time, and more engineering to maintain. In competition settings, the accuracy gain justifies the cost. In production, the tradeoffs often favor simpler models — especially when interpretability, latency, or operational simplicity is valued over the marginal accuracy improvement.` },
    { id: 30, name: "Anomaly Detection", desc: `Anomaly detection identifies data points that deviate significantly from expected patterns — the needle in a haystack of normal behavior. It's one of the most practically valuable ML applications because the most consequential events in many domains (fraud, equipment failure, cyberattacks, medical emergencies) are defined precisely by their deviation from normal.

**The challenge:** anomaly detection is inherently asymmetric. Normal examples are abundant; anomalies are rare, undefined in advance, and take novel forms not seen in historical data. You can't simply train a supervised classifier when you don't know what the anomalies look like — and labeling them is expensive, slow, or impossible at scale.

**Core approaches:**

**Statistical methods:**
- **Z-score / IQR:** flag points more than N standard deviations from the mean (or outside the interquartile range). Fast and interpretable, but assumes Gaussian distribution and doesn't handle multivariate anomalies
- **Mahalanobis distance:** measures distance from the center of the data distribution, accounting for feature correlations. Better than Euclidean distance for detecting multivariate outliers

**Proximity-based:**
- **KNN anomaly score:** a point is anomalous if its K nearest neighbors are far away — it's isolated from the data's density. Works well when anomalies are in low-density regions but is slow on large datasets
- **Local Outlier Factor (LOF):** compares a point's local density to the local density of its neighbors. Detects anomalies relative to local context, not global distribution — handles non-uniform data density

**Model-based:**
- **Isolation Forest:** builds random trees by repeatedly selecting a random feature and a random split value. Points that are isolated in fewer splits are anomalies — because anomalies are in sparse regions and require fewer splits to isolate. Fast, scalable, highly effective in practice. Works well with high-dimensional data
- **One-Class SVM:** trains a boundary around the normal data in feature space; points outside the boundary are anomalies. Slower but effective for complex normal distributions
- **Autoencoders:** train a neural network to reconstruct normal data. At inference, high reconstruction error signals an anomaly — the model hasn't learned to reconstruct the unusual pattern. Powerful for complex, high-dimensional data (images, sensor streams)

**Real-world example:** PayPal processes ~15M transactions per day and uses a layered anomaly detection stack. The first layer uses real-time statistical models (Z-score on transaction amounts, velocity checks on card usage frequency) to flag fast-moving patterns. The second layer uses gradient boosting models trained on historical fraud labels. The third layer uses unsupervised anomaly detection (Isolation Forest variants) to catch novel fraud patterns with no prior labels. The layered approach catches both known fraud signatures and previously unseen attack patterns — because fraudsters continually evolve their tactics.

**Key takeaway:** Start with Isolation Forest for any tabular anomaly detection problem — it's fast, parameter-light, and empirically strong. Use autoencoders when the data is high-dimensional and unstructured (time series, images, log data). Always define what "anomaly" means for your domain before choosing a method: a statistical outlier (unusual value) is different from a contextual anomaly (unusual in context but not globally) which is different from a collective anomaly (a group of points unusual together). The definition shapes the algorithm choice.` },
    { id: 31, name: "Time Series Forecasting", desc: `Time series forecasting predicts future values from a sequence of past observations ordered in time. It underlies some of the most economically consequential ML applications: demand forecasting, financial prediction, energy load forecasting, and predictive maintenance — problems where being one step ahead of reality has direct operational and financial value.

**What makes time series different from standard ML:**
- **Temporal dependence:** observations are not independent — yesterday's sales directly influence today's inventory levels. Standard ML algorithms assume i.i.d. (independent, identically distributed) samples; time series explicitly models dependence structure
- **No future data leakage:** train/test splits must be temporal — train on past, evaluate on future. Random shuffling would give the model information about the future during training (leakage)
- **Non-stationarity:** the statistical properties (mean, variance) of time series often change over time — requiring differencing, detrending, or time-aware features

**Classical statistical approaches:**

**ARIMA (AutoRegressive Integrated Moving Average):** the workhorse of univariate time series. AR terms: use past values to predict future (the series regresses on itself). I term: differencing to remove trends and achieve stationarity. MA terms: use past forecast errors. Works well for series with clear AR/MA structure; requires manual order selection (p, d, q) via ACF/PACF analysis.

**Seasonal decomposition (STL):** decompose series into trend, seasonal, and residual components; forecast each separately. Interpretable and robust, particularly for series with strong seasonality.

**Exponential Smoothing (ETS):** weighted averages of past observations where recent observations receive exponentially higher weights. Simple Exponential Smoothing for level, Holt's for trend, Holt-Winters for trend + seasonality. Fast and interpretable.

**Modern ML/DL approaches:**

**Prophet (Meta, 2017):** a decomposable additive model treating time series as trend + seasonality + holidays + error. Designed for business time series with strong seasonal effects and irregular holidays. Handles missing data and outliers gracefully. Requires minimal tuning, interpretable components.

**LightGBM/XGBoost for time series:** create lag features (value at t-1, t-2, ..., t-n), rolling statistics (7-day mean, 30-day std), and calendar features (day of week, month, holiday flags) from the raw series; train a gradient boosting model on these features. Highly competitive for multi-series forecasting where the model can learn patterns across many related series.

**Temporal Fusion Transformer (TFT):** an attention-based architecture specifically designed for multi-horizon forecasting. Handles mixed inputs (past time series, known future inputs like calendar features, static metadata like store ID), provides interpretable attention weights showing which past time steps were most predictive, and produces calibrated prediction intervals. State-of-art for complex multi-variate forecasting.

**N-BEATS / N-HiTS:** deep learning architectures designed purely for time series, without recurrence. Use residual stacks of fully-connected layers with interpretable basis function decomposition. Strong performance on M4/M5 competitions.

**Real-world example:** Walmart's supply chain uses ML time series forecasting to predict demand for 500M+ (item, store, day) combinations across their global network. Their M5 Forecasting competition entry (top solutions used LightGBM with heavy lag feature engineering) had direct operational consequences: over-forecasting leads to spoilage and markdowns; under-forecasting leads to stockouts and lost sales. At Walmart's scale, a 1% improvement in forecast accuracy translates to hundreds of millions of dollars in inventory efficiency.

**Key takeaway:** Choose your approach based on scale and complexity. For a single, interpretable business metric with seasonality: Prophet. For univariate statistical forecasting with small data: ARIMA or ETS. For forecasting many related series (retail, demand planning): LightGBM with lag features. For complex multi-variate forecasting with known future inputs: Temporal Fusion Transformer. Evaluation must always use time-based splits — never random — and MAPE (Mean Absolute Percentage Error) or WRMSSE (Weighted Root Mean Squared Scaled Error) rather than raw RMSE, to account for scale differences across series.` },
  ],
};
export default classicalMl;
