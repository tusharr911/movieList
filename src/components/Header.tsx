import Logo from "./Logo";
import LogoutButton from "./Logout";
import WatchListIcon from "./WatchListIcon";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between ">
        <Logo></Logo>
        <div className="flex items-center gap-5">
          <WatchListIcon></WatchListIcon>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
