import { ChevronRight } from 'lucide-react';
import { Section, FadeIn, DataTooltip } from '@components/shared';
import { entityTypes } from '@data/hardcoded/parent-dashboard-data';

/**
 * OntologyExplorer — Entity type grid and knowledge graph overview.
 * Implements VIEW 7 from tfs_storyboard_v4.html.
 * 
 * @param {Function} onNavigate - Navigate to another section
 */

export default function OntologyExplorer({ onNavigate }) {
  const totalEntities = entityTypes.reduce((sum, e) => sum + e.count, 0);

  return (
    <>
      {/* HEADER */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pt-20 pb-6 text-center">
          <FadeIn>
            <p className="text-[17px] text-[#6e6e73] font-medium mb-2">Knowledge Graph</p>
            <h1 className="text-[56px] md:text-[80px] font-semibold text-[#1d1d1f] leading-[1.05] tracking-[-0.045em]">
              The ontology.
            </h1>
            <p className="mt-4 text-[21px] text-[#6e6e73] leading-[1.38] max-w-[600px] mx-auto">
              {entityTypes.length} entity types comprising {totalEntities.toLocaleString()} total nodes in the customer experience knowledge graph.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ENTITY GRID */}
      <Section bg="light">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {entityTypes.map((entity) => (
              <div
                key={entity.id}
                className="rounded-[16px] bg-white p-6 flex flex-col transition-opacity duration-300 hover:opacity-80 cursor-default"
              >
                <p className="text-[28px] mb-3">{entity.icon}</p>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] leading-[1.23]">
                  {entity.name}
                </h3>
                <DataTooltip source={entity.source}>
                  <p className="mt-2 text-[28px] font-semibold text-[#1d1d1f] tracking-[-0.02em]">
                    {entity.count}
                  </p>
                </DataTooltip>
                <p className="mt-1 text-[12px] text-[#86868b]">instances</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* SUMMARY STATS */}
      <Section bg="white">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <DataTooltip source="hardcoded">
                <p className="text-[56px] font-semibold text-[#1d1d1f] leading-[1] tracking-[-0.04em]">
                  {entityTypes.length}
                </p>
              </DataTooltip>
              <p className="mt-2 text-[17px] text-[#6e6e73]">Entity types</p>
            </div>
            <div>
              <DataTooltip source="hardcoded">
                <p className="text-[56px] font-semibold text-[#1d1d1f] leading-[1] tracking-[-0.04em]">
                  {totalEntities.toLocaleString()}
                </p>
              </DataTooltip>
              <p className="mt-2 text-[17px] text-[#6e6e73]">Total nodes</p>
            </div>
            <div>
              <DataTooltip source="hardcoded">
                <p className="text-[56px] font-semibold text-[#EB0A1E] leading-[1] tracking-[-0.04em]">
                  247
                </p>
              </DataTooltip>
              <p className="mt-2 text-[17px] text-[#6e6e73]">Content assets crawled</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-16 text-center">
            <button
              onClick={() => onNavigate('opportunities')}
              className="text-[17px] text-[#0066cc] hover:underline inline-flex items-center gap-0.5"
            >
              View opportunities <ChevronRight className="w-3.5 h-3.5 mt-px" />
            </button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
