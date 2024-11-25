import { NavLink } from 'react-router-dom';


type SectionsProps = {
    nombre: string;
    url: string;
    SVGIcon: any;
}

function Sections( {nombre, url, SVGIcon }: SectionsProps) {
  return (
    <NavLink to={url}>
      <div className="flex flex-col items-center rounded-lg md:h-32 lg:h-24 xl:h-60 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-blue-950 hover:bg-blue-900 transform transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="flex flex-row md:flex-col md:items-center lg:flex-row lg:items-start justify-between">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
            {nombre}
          </h5>
          {SVGIcon ? <SVGIcon className="w-6 h-6 text-white" /> : null}
        </div>
      </div>
    </NavLink>
  )
}

export default Sections