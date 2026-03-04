import streamlit as st

# Set page configuration
st.set_page_config(
    page_title="Aura Portfolio | Creative Developer",
    page_icon="✨",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for "Aura" Aesthetic
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Inter', sans-serif;
        background-color: #fafafa;
    }
    
    .main {
        padding: 2rem 5rem;
    }
    
    .hero-title {
        font-size: 4.5rem;
        font-weight: 700;
        line-height: 1;
        letter-spacing: -0.05em;
        margin-bottom: 2rem;
        color: #18181b;
    }
    
    .hero-subtitle {
        font-size: 1.25rem;
        color: #71717a;
        max-width: 600px;
        line-height: 1.6;
        margin-bottom: 3rem;
    }
    
    .project-card {
        background: white;
        padding: 2rem;
        border-radius: 24px;
        border: 1px solid #f4f4f5;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
        transition: all 0.3s ease;
        margin-bottom: 2rem;
    }
    
    .tag {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background: #18181b;
        color: white;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .year-badge {
        font-family: monospace;
        background: #f4f4f5;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        color: #a1a1aa;
    }
    
    .stButton>button {
        border-radius: 9999px;
        padding: 0.5rem 2rem;
        font-weight: 600;
        transition: all 0.2s;
    }
    
    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    }
    </style>
    """, unsafe_allow_html=True)

# Hero Section
st.markdown('<h1 class="hero-title">Crafting digital <span style="color: #a1a1aa">experiences</span> that matter.</h1>', unsafe_allow_html=True)
st.markdown('<p class="hero-subtitle">Senior Product Designer & Creative Developer based in London. I build high-performance interfaces that bridge the gap between design and technology.</p>', unsafe_allow_html=True)

st.divider()

# Projects Data
projects = [
    {
        "id": 1,
        "title": "EcoSphere Dashboard",
        "year": "2024",
        "desc": "A real-time environmental monitoring platform with interactive data visualizations.",
        "long": "EcoSphere is a comprehensive environmental monitoring solution designed for city planners. It utilizes real-time sensor data to visualize air quality, noise levels, and traffic patterns.",
        "tags": ["React", "TypeScript", "D3.js", "Tailwind"],
        "link": "https://example.com"
    },
    {
        "id": 2,
        "title": "Lumina Creative Studio",
        "year": "2023",
        "desc": "A high-end digital agency landing page with immersive visual storytelling.",
        "long": "Lumina is a showcase of modern web capabilities. It features advanced scroll-triggered animations and high-fidelity assets.",
        "tags": ["Next.js", "Motion", "Three.js"],
        "link": "https://example.com"
    },
    {
        "id": 3,
        "title": "Synthetix API",
        "year": "2024",
        "desc": "A robust GraphQL API gateway for managing distributed microservices.",
        "long": "Synthetix provides a unified interface for complex microservice architectures. It handles authentication, rate limiting, and data aggregation.",
        "tags": ["Node.js", "GraphQL", "Docker"],
        "link": "https://example.com"
    },
    {
        "id": 4,
        "title": "Personal Portfolio v2",
        "year": "2025",
        "desc": "A professional portfolio showcasing creative works and technical skills.",
        "long": "This portfolio is a live demonstration of my design philosophy and technical stack. It features a custom filtering system and immersive animations.",
        "tags": ["React", "Motion", "Tailwind"],
        "link": "https://bilal007.godaddysites.com/"
    }
]

# Filtering Logic
st.header("Selected Works")
all_tags = sorted(list(set([tag for p in projects for tag in p["tags"]])))
filter_options = ["All"] + all_tags
selected_filter = st.selectbox("Filter by Technology", filter_options)

filtered_projects = projects if selected_filter == "All" else [p for p in projects if selected_filter in p["tags"]]

# Display Projects
col1, col2 = st.columns(2)
for i, p in enumerate(filtered_projects):
    with (col1 if i % 2 == 0 else col2):
        with st.container():
            st.markdown(f"### {p['title']} <span class='year-badge'>{p['year']}</span>", unsafe_allow_html=True)
            st.write(p['desc'])
            
            # Tags
            tag_html = "".join([f'<span class="tag">{tag}</span>' for tag in p["tags"]])
            st.markdown(tag_html, unsafe_allow_html=True)
            
            # Details Expander
            with st.expander("View Details"):
                st.write(p['long'])
                st.link_button("Live Preview", p['link'])
            
            st.write("") # Spacer

st.divider()

# Skills Section
st.header("Technical Stack")
s1, s2, s3, s4 = st.columns(4)
with s1:
    st.subheader("Frontend")
    st.write("- React\n- TypeScript\n- Tailwind")
with s2:
    st.subheader("Backend")
    st.write("- Node.js\n- Express\n- PostgreSQL")
with s3:
    st.subheader("Tools")
    st.write("- Git\n- Docker\n- AWS")
with s4:
    st.subheader("Design")
    st.write("- Figma\n- UI/UX\n- Responsive")

# Footer
st.write("---")
f1, f2 = st.columns([2, 1])
with f1:
    st.write(f"© {2025} Aura Portfolio. Built with Streamlit.")
with f2:
    st.write("[Twitter](https://twitter.com) | [LinkedIn](https://linkedin.com) | [GitHub](https://github.com)")
