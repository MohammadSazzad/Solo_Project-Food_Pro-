import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchFood from './components/ui/SearchFood'

function App() {

  return (
    <>
      <Header />
      <div>
        <SearchFood />
      </div>
      <Footer />
    </>
  )
}

export default App
