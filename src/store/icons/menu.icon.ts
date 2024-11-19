import { IconType } from "react-icons";
import { FaGoogleScholar, FaLandmark } from "react-icons/fa6";
import { GiBuyCard, GiGorilla, GiHealthIncrease, GiInjustice } from "react-icons/gi";
import { HiIdentification, HiReceiptTax } from "react-icons/hi";
import { IoMdAnalytics, IoMdCog } from "react-icons/io";
import { IoDocumentAttach } from "react-icons/io5";
import { MdAccountBalanceWallet, MdBusinessCenter, MdNaturePeople, MdOutlineSecurity, MdPublic, MdRoomService } from "react-icons/md";
import { PiMathOperationsFill } from "react-icons/pi";
import { RiStockFill } from "react-icons/ri";
import { SiSecurityscorecard } from "react-icons/si";

type MenuIconAssetType = {
    icon: IconType
}

export const menuIcons: Record<string, MenuIconAssetType> = {
    land: { icon: FaLandmark },
    tax: { icon: HiReceiptTax },
    accounting: { icon: MdAccountBalanceWallet },
    market: { icon: GiBuyCard },
    document: { icon: IoDocumentAttach },
    service: { icon: MdRoomService },
    hr: { icon: MdBusinessCenter },
    training: { icon: FaGoogleScholar },
    social: { icon: MdPublic },
    justice: { icon: GiInjustice },
    security: { icon: MdOutlineSecurity },
    environnement: { icon: MdNaturePeople },
    tourism: { icon: GiGorilla },
    idBio: { icon: HiIdentification },
    operation: { icon: PiMathOperationsFill },
    core: { icon: SiSecurityscorecard },
    stock: { icon: RiStockFill },
    healthCare: { icon: GiHealthIncrease },
    analytics: {icon : IoMdAnalytics},
    cog: {icon : IoMdCog}
}