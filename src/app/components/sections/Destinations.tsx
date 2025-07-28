export default function Destinations() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-blue-100 py-16">
      <div className="max-w-6xl mx-auto px-4 mb-12 -mt-16">
        <h2 className="text-4xl md:text-5xl font-raleway-bold text-center text-mdb-blue mb-6 drop-shadow-sm">
          Our Destinations
        </h2>
      </div>
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 mb-4">
            At MDB, our members and alumni have a track record of success,
            <br />
            moving on to positions in leading companies and innovative startups.
          </p>
          <p className="text-xl text-gray-700">
            Here's a glimpse of the companies where our members make an impact.
          </p>
        </div>

        {/* Company Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center mb-16">
          {/* Row 1 */}
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="/logos/janestreet.png" alt="Jane Street" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-12 object-contain" />
          </div>
          
          {/* Row 2 */}
          <div className="flex items-center justify-center h-20">
            <img src="/logos/atlassian.png" alt="Atlassian" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png" alt="Databricks" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" alt="Tesla" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="/logos/bloomberg.png" alt="Bloomberg" className="h-12 object-contain" />
          </div>
          
          {/* Row 3 */}
          <div className="flex items-center justify-center h-20">
            <img src="/logos/retool.png" alt="Retool" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg" alt="SpaceX" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="/logos/imc.png" alt="IMC" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg" alt="Goldman Sachs" className="h-12 object-contain" />
          </div>
          
          {/* Row 4 */}
          <div className="flex items-center justify-center h-20">
            <img src="/logos/blackrock.png" alt="BlackRock" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="/logos/blackstone.png" alt="Blackstone" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-12 object-contain" />
          </div>
          <div className="flex items-center justify-center h-20">
            <img src="/logos/delve.png" alt="Delve" className="h-12 object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
} 