import HeroSection from "./components/heroSection/HeroSection";
import ContentSection from "./components/contentSection/ContentSection";
import ServiceSection from "./components/serviceSection/ServiceSection";
import CtaSection from "./components/ctaSection/CtaSection";
import PromotionSection from "./components/promotionSection/PromotionSection";


export default function Home(){
    return(
        
        <>
            <HeroSection/>
            <ContentSection/>
            <ServiceSection/>
            <CtaSection/>
            <PromotionSection/>
        </>
        
    )
}