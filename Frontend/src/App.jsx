import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchFood from './components/ui/SearchFood'
import Category from './components/ui/Category'
import RestuarantHero from './components/ui/RestuarantHero'
import TrackingSection from './components/ui/TrackingSection'
import RestuarantCities from './components/ui/RestuarantCities'

function App() {

  return (
    <>
      <div className='App'>
        <SearchFood />
        <Category />
        <RestuarantHero />
        <TrackingSection />
        <RestuarantCities />
      </div>
    </>
  )
}

export default App
