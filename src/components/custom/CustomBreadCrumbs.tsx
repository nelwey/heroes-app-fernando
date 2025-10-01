import { Link } from "react-router";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb"
import { SlashIcon } from "lucide-react";


interface Breadcrumb {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadcrumbs?: Breadcrumb[];
}

export const CustomBreadCrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {

  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Inicio</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />


        {breadcrumbs.map(crumb => (
          <div className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbLink asChild>
                <Link to={crumb.to}> {crumb.label} </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem className="text-black">
          <BreadcrumbLink>{currentPage}</BreadcrumbLink>
        </BreadcrumbItem>

      </BreadcrumbList>
    </Breadcrumb>
  )
}
