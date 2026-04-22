import 'bootstrap/dist/css/bootstrap.min.css';
import { CaseStudies, Hero, Services, CTA } from './container';
import { Menu } from './components';




const App = () => (
  <div className="container">
    <Menu />
    <Hero />
    <Services />
    <CTA />
    <CaseStudies />
  </div>
);

export default App;
