import Logo from "./Logo";
import LogoutButton from "./Logout";
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
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
