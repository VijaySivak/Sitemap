import { useState, lazy, Suspense } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { Loading } from '@components/shared';

/**
 * ParentDashboard — Main container for the Parent Dashboard.
 * 
 * Manages active section state and renders the appropriate section view.
 * Uses the approved single dark nav bar with section tabs.
 * 
 * Sections:
 *   overview | products | journeys | sentiment | friction | operating | ontology | opportunities
 */

// Lazy-load section components
const Overview = lazy(() => import('./sections/Overview'));
const ProductAnalysis = lazy(() => import('./sections/ProductAnalysis'));
const JourneyStages = lazy(() => import('./sections/JourneyStages'));
const SentimentAnalysis = lazy(() => import('./sections/SentimentAnalysis'));
const FrictionLayers = lazy(() => import('./sections/FrictionLayers'));
const OperatingModel = lazy(() => import('./sections/OperatingModel'));
const OntologyExplorer = lazy(() => import('./sections/OntologyExplorer'));
const Opportunities = lazy(() => import('./sections/Opportunities'));


export default function ParentDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <Suspense fallback={<Loading />}>
            <Overview onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'products':
        return (
          <Suspense fallback={<Loading />}>
            <ProductAnalysis onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'journeys':
        return (
          <Suspense fallback={<Loading />}>
            <JourneyStages onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'sentiment':
        return (
          <Suspense fallback={<Loading />}>
            <SentimentAnalysis onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'friction':
        return (
          <Suspense fallback={<Loading />}>
            <FrictionLayers onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'operating':
        return (
          <Suspense fallback={<Loading />}>
            <OperatingModel onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'ontology':
        return (
          <Suspense fallback={<Loading />}>
            <OntologyExplorer onNavigate={handleNavigate} />
          </Suspense>
        );
      case 'opportunities':
        return (
          <Suspense fallback={<Loading />}>
            <Opportunities onNavigate={handleNavigate} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<Loading />}>
            <Overview onNavigate={handleNavigate} />
          </Suspense>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      {renderSection()}
    </div>
  );
}
