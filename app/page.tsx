import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import PageParticlesBackground from "@/components/three/PageParticlesBackground";
import SectionDivider from "@/components/ui/SectionDivider";
import Hero3D from "@/components/Hero3D";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <PageParticlesBackground />
      <Navbar />
      <main>
        <Hero3D />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
