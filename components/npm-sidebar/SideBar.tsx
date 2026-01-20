"use client";

import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Link from "next/link";
import {
  LayoutDashboard,
  Table as TableIcon, // Renamed to avoid conflict
  Kanban, // The actual Kanban icon
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
  SquareStack,
} from "lucide-react";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen sticky top-0 flex text-slate-900 dark:text-slate-100">
      <Sidebar
        collapsed={collapsed}
        backgroundColor="var(--sidebar-bg)"
        rootStyles={{
          borderColor: "rgba(200, 200, 200, 0.2)",
          color: "var(--sidebar-color)",
        }}
      >
        <div className="flex items-center justify-between p-4 min-h-[64px]">
          {!collapsed && (
            <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
              <SquareStack size={24} />
              <span>Mini Jira</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 ml-auto rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <Menu
          menuItemStyles={{
            button: {
              color: "var(--sidebar-color)",
              "&:hover": {
                backgroundColor: "rgba(0, 82, 204, 0.1)",
                color: "#0052cc",
              },
            },
          }}
        >
          {/* Main View Section with Kanban and Table Icons */}
          <SubMenu label="Views" icon={<LayoutDashboard size={20} />}>
            <MenuItem
              icon={<Kanban size={18} />}
              component={<Link href="/tasks/kanban" />}
            >
              Kanban Board
            </MenuItem>
            <MenuItem
              icon={<TableIcon size={18} />}
              component={<Link href="/tasks/table" />}
            >
              Task Table
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<FileText size={20} />} component={<Link href="/" />}>
            Documentation
          </MenuItem>

          <MenuItem
            icon={<Settings size={20} />}
            component={<Link href="/settings" />}
          >
            Settings
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
