
import CTA from "@/components/ui/CTA"
import FAQ from "@/components/ui/FAQ"
import Feature from "@/components/ui/Feature"

import LogoBlock from "@/components/ui/LogoBlock"
import Promo from "@/components/ui/Promo"
import ResumeCrsl from "@/components/ui/ResumeCrsl"
import { ReviewSection } from "@/components/ui/ReviewSection"
import { Outlet, useNavigate } from "react-router-dom"


const Home = () => {
   const navigate = useNavigate();
  return (
    <div>
         <Promo onGetStartedClick={() => navigate("/select-role")} />
             <main className="flex-grow">
               <Outlet /> 
             </main>
             <LogoBlock />
             <Feature />
             <div className="mb-15">
              <ResumeCrsl />
             </div>
             <div className="mb-10">
               <ReviewSection />
             </div>
             <div className="mt-9">
               <CTA />
             </div>
             <FAQ />
           
    </div>
  )
}

export default Home