import React, { useState, useContext } from "react";
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';

// components
import Upload from "../upload/upload";

// context
import { AuthContext } from "../../context/auth";
import { UserContext } from "../../context/user";

// icons
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { GrHomeRounded } from 'react-icons/gr';
import { MdOutlineExplore, MdLogout } from 'react-icons/md';

// images 
import logo from '../../assets/instagram.png';

const Avatar = ({ changeDropdownVisibility, visible, logout, user})=> (
    <div className={`${styles.headerNavItem} ${styles.headerProfile}`}>
        <div className={styles.headerAvatar} onClick={changeDropdownVisibility}>
            {user?.avatar && <Image src={user?.avatar} width={24} height={24} className={styles.headerRounded} objectFit="cover" />}
        </div>
        { visible && <Dropdown handleClick={logout} username={ user?.username} /> }
    </div>
);

const Container = ({ children, styleName })=> (
    <div className={styleName}>
        { children }
    </div>
);

const Dropdown = ({ handleClick, username })=> (
    <Container styleName={styles.dropdownContainer}>
        <DropdownItem 
            Icon={HiOutlineUserCircle} 
            closeDropdown={()=> setVisible(false)}
            placeholder={"My Profile"} 
            url={`/user/${username || '' }`} 
        />
        <DropdownItem placeholder={"Logout"} Icon={MdLogout} handleClick={handleClick} />
    </Container>
);

const DropdownItem = ({ url, Icon, placeholder, closeDropdown, handleClick })=> (
    <>
        { url ? <Link href={url}>
            <a className={styles.dropdownItem} onClick={closeDropdown}>
                <Icon className={styles.dropdownItemIcon} />
                <span className={styles.dropdownItemText}> { placeholder } </span>
            </a>
        </Link> : <div className={`${styles.dropdownItem} ${styles.lineTop}`} onClick={handleClick}>
            <Icon className={styles.dropdownItemIcon} />
            <span className={styles.dropdownItemText}> { placeholder } </span>
        </div>}
    </>
);

const LogoContainer = ({ logo })=> (
    <div className={styles.headerLogo}>
        <Link href="/">
            <a className={styles.logo}>
                <Image src={logo} alt='' width={120} height={30} objectFit="cover" layout="fixed" />
            </a>
        </Link>
    </div>
);

const NavItem = ({ url, Icon, handleClick })=> (
    <div className={styles.headerNavItem}>
        { url ? <Link href={url}>
            <a>
                <Icon className={styles.headerIcon} color="black" />
            </a>
        </Link>: <Icon className={styles.headerIcon} onClick={handleClick} />}
    </div>
);

const SearchBar = ()=> (
    <div className={styles.headerSearchBar}>
        <div className={styles.headerSearchBox}>
            <div className={styles.headerSearchIcon}>
                <FiSearch />
            </div>
            <div className={styles.headerSearchInput}>
                <input type='text' className={styles.headerInput} placeholder="Search" />
            </div>
        </div>
    </div>
);


export default function Header(){
    const { logout } = useContext(AuthContext);
    const { user_data: user } = useContext(UserContext);
    
    const [ open, setOpen ] = useState(false);
    const closeUploadModal = ()=> {
        setOpen(false);
    }
    
    const [ visible, setVisible ] = useState(false);
    const changeDropdownVisibility = ()=> setVisible(!visible);
    

    return (
        <>
            { open && <Upload closeUploadModal={closeUploadModal} />}
            <Container styleName={styles.header}>
                <Container styleName={styles.headerContainer}>
                    <LogoContainer logo={logo} />
                    <SearchBar />
                    <Container styleName={styles.headerNav}>
                        <NavItem url={'/'} Icon={GrHomeRounded} />
                        <NavItem url={'/explore'} Icon={MdOutlineExplore} />
                        <NavItem Icon={AiOutlinePlusCircle} handleClick={()=> setOpen(true)} />
                        <Avatar changeDropdownVisibility={changeDropdownVisibility} visible={visible} logout={logout} user={user} />
                    </Container>
                </Container>
            </Container>
        </> 
    )
}