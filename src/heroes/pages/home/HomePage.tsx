import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumboTron } from '../../../components/custom/CustomJumboTron';
import { HeroStats } from '../../components/HeroStats';
import { HeroGrid } from '../../components/HeroGrid';
import { CustomPagination } from '../../../components/custom/CustomPagination';
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useSearchParams } from "react-router";
import { use, useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'aa';
  const { favoriteCount, favorites } = use(FavoriteHeroContext);


  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

  const { data: summary } = useHeroSummary();
  return (
    <>
      <>
        {/* Header */}
        <CustomJumboTron title="Universo de SuperHeroes" description="Descubre, explora y administra super heroes y villanos" />

        <CustomBreadCrumbs currentPage="Home" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">

            <TabsTrigger
              value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all');
                prev.set('category', 'all');
                prev.set('page', '1');
                return prev;
              })} >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger
              value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites');
                return prev;
              })} >
              Favoritos ({favoriteCount})
            </TabsTrigger>


            <TabsTrigger
              value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes');
                prev.set('category', 'hero');
                prev.set('page', '1');
                return prev;
              })} >
              Heroes ({summary?.heroCount})
            </TabsTrigger>

            <TabsTrigger
              value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains');
                prev.set('category', 'villain');
                prev.set('page', '1');
                return prev;
              })} >
              Villanos ({summary?.villainCount})
            </TabsTrigger>

          </TabsList>
          <TabsContent value='all'>
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>


          <TabsContent value='favorites'>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value='heroes'>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='villains'>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
          )
        }

      </>
    </>
  )
}