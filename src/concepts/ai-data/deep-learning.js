const deepLearning = {
  name: "Deep Learning Architectures",
  icon: "⬢",
  color: "#EC4899",
  concepts: [
    { id: 32, name: "Feedforward Neural Network (MLP)", desc: "Simplest neural network: data flows one direction through fully connected layers. Multi-Layer Perceptron. Activation functions: ReLU, sigmoid, tanh. Universal approximator." },
    { id: 33, name: "Convolutional Neural Networks (CNN)", desc: "Specialized for spatial data (images). Convolutional layers learn local patterns (edges, textures). Pooling reduces dimensions. ResNet, VGG, EfficientNet architectures." },
    { id: 34, name: "Recurrent Neural Networks (RNN)", desc: "Process sequential data with memory. Hidden state carries information across time steps. Vanishing gradient problem limits long sequences. Largely replaced by Transformers." },
    { id: 35, name: "LSTM & GRU", desc: "LSTM: Long Short-Term Memory. Gates (forget, input, output) control information flow. GRU: simplified variant with fewer gates. Better than vanilla RNN for long sequences." },
    { id: 36, name: "Transformer Architecture", desc: "Self-attention mechanism processes all positions simultaneously. No recurrence. Scales with parallel computation. Foundation of GPT, BERT, and all modern LLMs. 'Attention Is All You Need' (2017)." },
    { id: 37, name: "Self-Attention Mechanism", desc: "Each token attends to all other tokens, learning relevance weights. Query, Key, Value matrices. Multi-head attention for different relationship types. O(n²) complexity." },
    { id: 38, name: "Encoder-Decoder Architecture", desc: "Encoder processes input into representation, decoder generates output. Seq2seq: translation, summarization. T5, BART. Encoder-only: BERT. Decoder-only: GPT." },
    { id: 39, name: "Autoencoder", desc: "Neural network that compresses data (encoder) and reconstructs it (decoder). Learns compressed representations. Variational Autoencoders (VAE) for generation. Denoising autoencoders." },
    { id: 40, name: "Generative Adversarial Network (GAN)", desc: "Two networks: Generator creates fakes, Discriminator detects fakes. Adversarial training. StyleGAN for images. Training instability (mode collapse). Largely superseded by diffusion models." },
    { id: 41, name: "Diffusion Models", desc: "Learn to denoise data step by step. Forward process adds noise, reverse process removes it. Stable Diffusion, DALL-E, Midjourney. Current state-of-art for image generation." },
    { id: 42, name: "Graph Neural Networks (GNN)", desc: "Neural networks on graph-structured data. Message passing between connected nodes. Node classification, link prediction, graph classification. Social networks, molecules, knowledge graphs." },
    { id: 43, name: "State Space Models (Mamba)", desc: "Alternative to Transformers for sequences. Linear complexity vs Transformer's quadratic. Selective state spaces. Mamba architecture. Promising for very long sequences." },
    { id: 44, name: "Mixture of Experts (MoE)", desc: "Route inputs to specialized sub-networks (experts). Only activate a subset per input. Scales model capacity without proportional compute increase. Mixtral, Switch Transformer." },
    { id: 45, name: "Neural Architecture Search (NAS)", desc: "Automatically discovering optimal network architectures. Reinforcement learning, evolutionary algorithms, one-shot methods. EfficientNet discovered via NAS." },
  ],
};
export default deepLearning;
