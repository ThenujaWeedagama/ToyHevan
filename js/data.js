/* Toy Haven — product catalogue
   Single source of truth for product data, shared across pages. */

const TOY_HAVEN_PRODUCTS = [
  { id: "fig-001", name: "Nebula Fox Figurine", category: "Figurines", price: 24.99, blurb: "Hand-painted resin fox with a starfield glaze.", img: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&q=80" },
  { id: "fig-002", name: "Iron Sentinel Statue", category: "Figurines", price: 39.5, blurb: "Articulated 15cm collectible with weathered-metal finish.", img: "https://images.unsplash.com/photo-1599623560574-39d485900c95?w=600&q=80" },
  { id: "fig-003", name: "Paper Crane Spirit", category: "Figurines", price: 18.0, blurb: "Matte-white origami-inspired figure, limited run.", img: "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?w=600&q=80" },
  { id: "fig-004", name: "Tidepool Kaiju Mini", category: "Figurines", price: 21.75, blurb: "Glow-in-the-dark vinyl kaiju, 8cm tall.", img:" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1FbTe81yAJ9QrIRhigKD1LE3afRAE_yCBo_FEXXXeefR3XvdUcjVf5rEj&s=10" },

  { id: "toy-001", name: "Skyline Building Blocks", category: "Toys", price: 34.0, blurb: "412-piece set for building your own city skyline.", img: "https://thumbs.dreamstime.com/b/toy-block-skyscraper-overlooking-city-sunset-colorful-tower-stands-tall-mimicking-iconic-skyscrapers-skyline-behind-415443692.jpg" },
  { id: "toy-002", name: "Wind-Up Tin Diver", category: "Toys", price: 14.25, blurb: "Classic tin toy with a working wind-up mechanism.", img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80" },
  { id: "toy-003", name: "Plush Comet Bear", category: "Toys", price: 22.5, blurb: "Ultra-soft 30cm bear with embroidered star patches.", img: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?w=600&q=80" },
  { id: "toy-004", name: "Marble Run Cascade", category: "Toys", price: 45.0, blurb: "Modular wooden marble run, 96 pieces.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXnK3ECM-Y_uf3i7rofXr6YfZDovMiZjPnyISOBQzafxjxQihFeojpaTM&s=10" },

  { id: "bg-001", name: "Lantern Market Board Game", category: "Board Games", price: 29.99, blurb: "2–5 player trading game set in a night market.", img: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&q=80" },
  { id: "bg-002", name: "Cartographer's Guild", category: "Board Games", price: 36.0, blurb: "Cooperative map-drawing game for 1–4 explorers.", img: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&q=80" },
  { id: "bg-003", name: "Orchard Keepers", category: "Board Games", price: 27.5, blurb: "Fast-paced tile-laying game about tending an orchard.", img: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&q=80" },
  { id: "bg-004", name: "Signal Relay", category: "Board Games", price: 32.0, blurb: "Party deduction game for 4–8 players.", img: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600&q=80" },

  { id: "car-001", name: "1967 Falcon Coupe 1:24", category: "Diecast Cars", price: 28.0, blurb: "Die-cast replica with opening doors and hood.", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80" },
  { id: "car-002", name: "Rally Raid Truck 1:18", category: "Diecast Cars", price: 42.0, blurb: "Working suspension, rally livery, 1:18 scale.", img: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=600&q=80" },
  { id: "car-003", name: "Vintage Fire Engine 1:43", category: "Diecast Cars", price: 19.5, blurb: "Detailed ladder truck with rotating wheels.", img: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=600&q=80" },
  { id: "car-004", name: "Midnight GT Coupe 1:24", category: "Diecast Cars", price: 31.0, blurb: "Matte-black sports coupe with LED-effect headlamps.", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80" },
];

const TOY_HAVEN_CATEGORIES = ["Figurines", "Toys", "Board Games", "Diecast Cars"];
