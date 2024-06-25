import logo from "@/public/logo_veneto.png";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const footerLabels = [
    // "Accessibiltà",
    // "Dichiarazione di accessibilità",
    "Privacy",
    // "Informativa Cookies",
    // "Pubblicità legale",
    "Note legali",
  ];

  return (
    <footer className="z-30 flex items-center justify-between bg-slate-200 px-4 py-6">
      <Image src={logo} alt={"3D Informatica logo"} width={240} height={240} />
      <section className="flex items-center space-x-2">
        <Link className="footer_link" href={""}>
          {footerLabels[0]}
        </Link>
        <Separator
          orientation="vertical"
          className="h-4 w-[1.2px] bg-black opacity-45"
        />
        <Link className="footer_link" href={""}>
          {footerLabels[1]}
        </Link>
        {/* <Separator
          orientation="vertical"
          className="h-4 w-[1.2px] bg-black opacity-45"
        />
        <Link className="footer_link" href={""}>
          {footerLabels[2]}
        </Link>
        <Separator
          orientation="vertical"
          className="h-4 w-[1.2px] bg-black opacity-45"
        />
        <Link className="footer_link" href={""}>
          {footerLabels[3]}
        </Link>
        <Separator
          orientation="vertical"
          className="h-4 w-[1.2px] bg-black opacity-45"
        />
        <Link className="footer_link" href={""}>
          {footerLabels[4]}
        </Link>
        <Separator
          orientation="vertical"
          className="h-4 w-[1.2px] bg-black opacity-45"
        />
        <Link className="footer_link" href={""}>
          {footerLabels[5]}
        </Link> */}
      </section>
    </footer>
  );
}
