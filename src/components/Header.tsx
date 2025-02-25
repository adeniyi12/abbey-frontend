import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react"; // Assuming you're using Headless UI
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Assuming you're using Heroicons
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    navigate("/");
  };

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 items-center">
          <a href="/" className="-m-1.5 p-1.5 flex items-center">
            <img alt="Your Company Logo" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f38f.svg" className="h-8 w-auto mr-2" />
            <span className="text-lg font-semibold text-gray-900">Abbey Socials</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-6">
          {auth?.user ? (
            <>
              {/* Feed and Profile tabs */}
              <Link to="/feed" className="text-sm font-semibold leading-6 text-gray-900">
                Feed
              </Link>
              <Link to={`/profile/user/${auth?.user?.user_id}`} className="text-sm font-semibold leading-6 text-gray-900">
                Profile
              </Link>
              {/* Logout */}
              <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-gray-900">
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
            </>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="Your Company" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f38f.svg" className="h-8 w-auto" />
            </a>
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-4">
                {auth?.user ? (
                  <>
                    <a href="/feed" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Feed
                    </a>
                    <a href="/profile" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Profile
                    </a>
                    <button onClick={handleLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Logout
                    </button>
                  </>
                ) : (
                  <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Log in
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
