import { menuIcons } from "@/store/icons/menu.icon";
import { CurrentMenuStore } from "@/store/pageData/currentMenu";
import { SideBareStatement } from "@/store/pageData/sideBareStatement";
import { MenuAssetType } from "@/types/request/types/menu";
import { useRouter } from "next/navigation";
import { CiFolderOn } from "react-icons/ci";
import { useStore } from "zustand";

export const MenuSections = (props: MenuAssetType) => {
  const currentMenuStore = useStore(CurrentMenuStore);
  const HandleMenuClick = () => {
    currentMenuStore.setFullMenuData(props);
  };

  const handleButtonClick = () => {
    HandleMenuClick();
    if (window.innerWidth < 768) {
      setState(true);
    } else {
      router.push(`dp/sub/${props.id}`);
    }
  };

  const { setState } = useStore(SideBareStatement);
  const router = useRouter();
  let Icon = CiFolderOn;
  if (props.icon)
    Icon = props.icon in menuIcons ? menuIcons[props.icon].icon : CiFolderOn;
  return (
    <button
      onClick={handleButtonClick}
      onTouchStart={handleButtonClick}
      title={props.verbose}
      className="group cursor-pointer flex flex-col border border-primary !touch-manipulation text-primary w-36 h-32 max-md:w-full max-md:h-28 p-5 rounded-lg items-center hover:bg-[#048a96bd] transition ease-in-out delay-150 "
    >
      <span className="group-hover:scale-110 group-hover:font-medium group-hover:text-white transition h-full ease-in-out delay-150">
        <Icon className="text-[40px] " />
      </span>
      <span className="group-hover:scale-110 h-full group-hover:font-medium group-hover:text-white transition ease-in-out delay-150 text-md text-center">
        {" "}
        {props.name}{" "}
      </span>
    </button>
  );
};
