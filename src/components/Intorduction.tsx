import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Github, Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider"; // Adjust the import path as needed
import * as THREE from "three";

export default function Introduction() {
  const { theme, toggleTheme } = useTheme(); // Use the useTheme hook
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloat(0, 500);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Set camera position
    camera.position.z = 1;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Twinkling effect
      starMaterial.opacity = 0.5 + 0.5 * Math.sin(Date.now() * 0.001);

      // Rotate stars
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };
    animate();

    // Render the scene
    const renderScene = () => {
      renderer.render(scene, camera);
    };
    renderScene();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderScene();
    };
    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-800 to-black text-gray-100"
          : "bg-gradient-to-b from-gray-50 to-white text-gray-800"
      }`}
    >
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div
        className={`absolute top-0 left-0 w-full h-full z-0 pointer-events-none ${
          theme === "dark"
            ? "bg-gradient-to-b from-transparent to-black"
            : "bg-gradient-to-b from-transparent to-white"
        }`}
      />
      <header className="w-full p-4 flex justify-end relative z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 relative z-10">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-64 h-64 md:w-96 md:h-96 relative rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 shadow-xl">
            <img
              src="src/static/photo.JPG" // Ensure the path is correct and starts with a slash
              alt="Sein Jone"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex-grow space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold">Sein Jone Tan</h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400">
              Research Assistant
            </p>
            <p
              className={`text-lg md:text-xl max-w-2xl ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              Welcome to my personal website! I'm a recent graduate from UBC's
              MA Econ program with a passion for data analysis and software
              development. I'm currently seeking opportunities in data science,
              software engineering, and research. This website showcases my
              research as well as demos for my personal projects. Feel free to
              reach out if you have any questions or opportunities! The source
              code for this website is available on GitHub.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="src/static/resume.pdf" download>
                <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                  <FileText size={18} />
                  View CV
                </Button>
              </a>
              <a href="https://github.com/seinjonetan/portfolio_website">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800 transition-colors"
                >
                  <Github size={18} />
                  Source Code
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
