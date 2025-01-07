"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { 
    Sheet,
    SheetContent, 
    SheetTrigger 
} from "@/components/ui/sheet";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = ( ) => {
    const [isMounated, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounated) {
        return null;
    }

    return ( 
        <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon"
                className="md:hidden">
               <Menu />
              </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
              <Sidebar />
          </SheetContent>
        </Sheet> 
     );
}

export default MobileSidebar;