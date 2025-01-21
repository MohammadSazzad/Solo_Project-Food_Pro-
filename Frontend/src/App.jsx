import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchFood from './components/ui/SearchFood'
import Category from './components/ui/Category'
import RestuarantHero from './components/ui/RestuarantHero'
import TrackingSection from './components/ui/TrackingSection'
import RestuarantCities from './components/ui/RestuarantCities'
import ListingSection from './components/ui/ListingSection'

function App() {

  return (
    <>
      <div className='App'>
        <SearchFood />
        <Category />
        <RestuarantHero />
        <TrackingSection />
        <ListingSection />
        <RestuarantCities />
      </div>
    </>
  )
}

export default App
