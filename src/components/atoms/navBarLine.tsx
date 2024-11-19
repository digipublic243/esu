import { MenuAssetType } from "@/src/types/request/types/menu";

const NavBarLine = (props: {
  link: MenuAssetType;
  handleClick: (e: React.MouseEvent, link: MenuAssetType) => void;
  isActive: boolean;
}) => {
  return (
    <li key={props.link.id} title={props.link.verbose}>
      <div
        className={`flex items-center gap-5 cursor-pointer max-md:my-2 px-3 py-2 rounded-md font-medium ${
          props.isActive
            ? "text-white bg-primary md:mr-4"
            : "text-gray-100 hover:md:rounded max-md:text-black hover:bg-primary hover:text-white mr-4"
        }`}
        onClick={(e) => props.handleClick(e, props.link)}
      >
        {props.link.name}
      </div>
    </li>
  );
};

export default NavBarLine;
