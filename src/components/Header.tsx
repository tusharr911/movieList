import Logo from "./Logo";
import UsersAvatar from "./UsersAvatar";
import WatchListIcon from "./WatchListIcon";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between ">
        <Logo></Logo>
        <div className="flex items-center gap-5">
          <WatchListIcon></WatchListIcon>
          <UsersAvatar></UsersAvatar>
        </div>
      </nav>
    </header>
  );
}
