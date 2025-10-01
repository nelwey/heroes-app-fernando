import { CustomJumboTron } from "@/components/custom/CustomJumboTron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from './ui/SearchControls';
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useQuery } from "@tanstack/react-query";
import { HeroGrid } from '../../components/HeroGrid';
import { searchHeroesAction } from "@/heroes/actions/search-heroes.action";
import { useSearchParams } from "react-router";

export const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  //TODO: useQuery, traer la data de los heroes, el nombre viene en la url  

  const { data: heroes = [] } = useQuery({
    queryKey: ['search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomBreadCrumbs currentPage={'Buscador de heroes'} />
      <CustomJumboTron title="Busqueda de SuperHeroes" description="Descubre, explora y administra super heroes y villanos" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      <HeroGrid heroes={heroes}></HeroGrid>
    </>
  )
}

export default SearchPage;
