import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loading } from '@components/shared';
import SkeletonPage from '@pages/skeleton/SkeletonPage';

const ParentDashboard = lazy(() => import('@pages/parent-dashboard/ParentDashboard'));

// Placeholder pages — uses design system tokens to verify Tailwind config
const PlaceholderPage = ({ title, description }) => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
    <div className="text-center animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-6">
        <div className="w-3 h-3 rounded-full bg-primary-600" />
      </div>
      <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">{title}</h1>
      <p className="mt-3 text-lg text-neutral-500">{description}</p>
      <div className="mt-8 inline-flex gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-data-source-hardcoded/10 text-data-source-hardcoded">Hardcoded</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-data-source-json/10 text-data-source-json">JSON</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-data-source-sqlite/10 text-data-source-sqlite">SQLite</span>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Skeleton/Demo Page — for design approval (Chapter 3) */}
      <Route path="/skeleton" element={<SkeletonPage />} />

      {/* Level 2: FAQ Insights Area */}
      <Route path="/faq/*" element={
        <PlaceholderPage 
          title="FAQ Insights" 
          description="FAQ Knowledge Graph & Analytics — Coming in Chapter 11" 
        />
      } />

      {/* Level 1: Parent Dashboard (catch-all, must be last) */}
      <Route path="/*" element={
        <Suspense fallback={<Loading />}>
          <ParentDashboard />
        </Suspense>
      } />
    </Routes>
  );
}

export default App;
