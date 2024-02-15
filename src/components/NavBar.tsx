"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const NavBar = () => {
  const [providersFound, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

	const [toggleDropdown, setToggleDropdown] = useState(false)

  // const { data: session } = useSession();
  const isUserLoggedIn = true;

  useEffect(() => {
    const providers = async () => {
      const response = await getProviders();
      console.log({response})
      setProviders(response);
    };

    providers();
  }, []);
  
  return (
    <nav className="flex-between w-full mb-6 pt-3">
      <Link href="/" className="flex gap-1 flex-center">
        <b className="max-sm:hidden text-4xl orange_gradient">PR</b>
        <Image
          src="../assets/images/logo.svg"
          alt="logo"
          width={28}
          height={28}
          className="object-contain"
        ></Image>
        <b className="max-sm:hidden text-4xl orange_gradient">MPTS</b>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn && (
          <div className="flex gap-3 flex-center">
            <Link href="/create-prompt" className="black_btn h-8">
              {" "}
              Create Post{" "}
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn h-8"
            >
              {" "}
              Sign Out{" "}
            </button>
            <Link href="/profile" className="flex flex-center">
              <Image
                src="../assets/images/avatar.svg"
                alt="profile"
                width={37}
                height={37}
                className="rounded-full ml-2"
              ></Image>
            </Link>
          </div>
        )}
        {!isUserLoggedIn &&
          providersFound &&
          Object.values(providersFound).map((provider) => {
            return (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            );
          })}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn && (
          <div className="flex">
            <Image
              src="../assets/images/avatar.svg"
              alt="profile"
              width={30}
              height={30}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            ></Image>

						{
							toggleDropdown && 
							<div className="dropdown">
								<Link href='/create-prompt' className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
								<Link href='/profile' className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
								<button type='button' className="mt-5 w-full black_btn" onClick={() => {
									setToggleDropdown(false)
									signOut()
								}}>Sign Out</button>
							</div>
						}
          </div>
        )}

        {!isUserLoggedIn &&
          providersFound &&
          Object.values(providersFound).map((provider) => {
            return (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
            );
          })}
      </div>
    </nav>
  );
};

export default NavBar;
