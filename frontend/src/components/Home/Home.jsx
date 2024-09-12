import HeroSection from "./components/heroSection/HeroSection";
import ContentSection from "./components/contentSection/ContentSection";
import ServiceSection from "./serviceSection/ServiceSection";
import CtaSection from "./ctaSection/CtaSection";

export default function Home(){
    return(
        
        <>
            <HeroSection/>
            <ContentSection/>
            <ServiceSection/>
            <CtaSection/>
        </>
        
    )
}