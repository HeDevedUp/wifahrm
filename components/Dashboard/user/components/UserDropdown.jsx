import { useState } from "react";
import Link  from "next/link";
import { Menu } from "@headlessui/react";
import { Settings, User as Profile, LogOut } from "react-feather";
import clsx from "clsx";
import Avatar from "../../shared/components/ui/avatars/Avatar";
import Dropdown from "../../shared/components/ui/dropdown/Dropdown";
import LogoutModal from "./modals/LogoutModal";
import {ProfileCircle} from 'iconsax-react';


const UserDropdownAvatar = ({ user }) => {
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    return (
        <>
            <Dropdown element={<ProfileCircle size="44"  variant="Bold" color="#37d67a"/>}>
                <div>
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                            href='/profile'  
                                className={clsx(
                                    active ? "bg-accent " : "text-white",
                                    "block px-4 py-2 text-base cursor-pointer"
                                )}
                            >
                                <span className="flex items-center">
                                    <Profile size={22} color={'#fff'} className="w-6 mr-2" />{" "}
                                    Profile
                                </span>
                            </Link>
                        )}
                    </Menu.Item>
                    {/* <Menu.Item>
                        {({ active }) => (
                            <Link
                            href='/profile'  
                                className={clsx(
                                    active ? "bg-accent" : "text-primary-t/80",
                                    "block px-4 py-2 text-sm cursor-pointer"
                                )}
                            >
                                <span className="flex items-center">
                                    <Settings size={20} className="w-6 mr-2" />{" "}
                                    Settings
                                </span>
                            </Link>
                        )}
                    </Menu.Item> */}
                </div>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            className={clsx(
                                active ? "bg-accent" : "text-white",
                                "block px-4 py-2 text-base cursor-pointer"
                            )}
                            onClick={() => setLogoutModalOpen(true)}
                        >
                            <span className="flex items-center">
                                <LogOut size={20} color={'#fff'} className="w-6 mr-2" /> Logout
                            </span>
                        </a>
                    )}
                </Menu.Item>
            </Dropdown>
            <LogoutModal
                openNow={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
            />
        </>
    );
};

export default UserDropdownAvatar;
