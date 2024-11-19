"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { Airplay, EllipsisVertical, Plus } from "lucide-react";
import React, { useImperativeHandle, forwardRef } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/src/components/ui/pagination";
import { RequestHandler } from "@/src/utils/api";
import ConfigsTitle from "./configTitle";
import ConfigDataTableSkeleton from "./configDataTableSkeleton";
import ConfigModalComponent from "./configModal";
import ConfigCreationComponent from "./configCreationComponent";
import { DataActionsType } from "@/src/types/dataActions.type";

const ConfigDataTableComponent = (
  props: { getUrl: string; title: string; subtitle: string },
  ref?: any
) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activityIsRunning, setActivityIsRunning] = useState(false);

  const [actionData, setActionData] = useState<DataActionsType | null>(null);
  const [actionType, setActionType] = useState<"post" | "patch">("post");

  const [dataTableList, setDataTableList] = useState([]);

  const [localLimit, setLocalLimit] = useState(5);
  const [localOffset, setLocalOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const openModalEvent = (actionType: "post" | "patch") => {
    if (actionData) {
      setActionType(actionType);
      setModalOpen(true);
    }
  };

  const closeModalEvent = () => {
    setModalOpen(false);
    fetchData();
  };

  const totalPages = Math.ceil(total / localLimit);
  const currentPage = localOffset / localLimit + 1;

  const fetchData = async () => {
    try {
      setActivityIsRunning(true);
      const requestHandler = new RequestHandler();
      const response = await requestHandler.get({
        method: "GET",
        path: `${props.getUrl}?limit=${localLimit}&offset=${localOffset}`,
      });
      setActivityIsRunning(false);
      console.log("\n\nresponse :: ", response, "\n\n\n");
      if (response.code != 200) return;
      if (response && "actions" in response && "methods" in response.actions)
        setActionData(response.actions.methods);
      if (Array.isArray(response.data)) {
        setDataTableList(response.data);
        setTotal(response.total);
      } else {
        setTotal(0);
        setDataTableList([]);
      }

      // const data = await api.path.getAll();
      // setPaths(data);
    } catch (error) {
      setActivityIsRunning(false);
      console.error("Error fetching paths:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setActivityIsRunning(true);
        const requestHandler = new RequestHandler();
        const response = await requestHandler.get({
          method: "GET",
          path: `${props.getUrl}?limit=${localLimit}&offset=${localOffset}`,
        });
        setActivityIsRunning(false);
        console.log("\n\nresponse :: ", response, "\n\n\n");
        if (response.code != 200) return;
        if (response && "actions" in response && "methods" in response.actions)
          setActionData(response.actions.methods);
        if (Array.isArray(response.data)) {
          setDataTableList(response.data);
          setTotal(response.total);
        } else {
          setTotal(0);
          setDataTableList([]);
        }

        // const data = await api.path.getAll();
        // setPaths(data);
      } catch (error) {
        setActivityIsRunning(false);
        console.error("Error fetching paths:", error);
      }
    };
    fetchData();
  }, [localOffset, localLimit, props.getUrl]);

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all pages if total pages are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Start pages
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...");
      }
      // Middle pages
      else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      }
      // Dynamic middle with ellipses on both ends
      else {
        pageNumbers.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "..."
        );
      }
    }
    return pageNumbers;
  };

  // Expose the child function to the parent via ref
  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  const handlePageChange = (page: number) => {
    setLocalOffset((page - 1) * localLimit);
  };
  const handleModalSave = () => {
    console.log("Changes saved!");
    fetchData();
    // Any additional actions on save can be performed here
  };

  return (
    <div className="flex flex-col">
      <ConfigDataTableSkeleton isLoading={activityIsRunning}>
        <>
          <ConfigsTitle
            {...{
              title: props.title,
              subTitle: props.subtitle,
              handleAddEvent: () => {
                openModalEvent("post");
              },
              handleRefreshEvent: fetchData,
            }}
          />

          {(localOffset == 0 && dataTableList.length == 0) ||
          (localOffset > 0 && dataTableList.length == 0) ? (
            <div className="flex flex-col justify-center items-center">
              <div className=" flex flex-col items-center space-x-4 rounded-md border p-4">
                <div className="mb-3 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                    />
                  </svg>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-center leading-none">
                    {props.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aucune donnée pour l&apos;instant {"("} {props.title} {")"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 flex flex-col">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataTableList.map((path: any) => (
                      <TableRow key={path.id}>
                        <TableCell className="first-letter:uppercase">
                          {path.label || path.url || path.name}
                        </TableCell>
                        <TableCell>{path.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="outline" size="icon">
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {["patch", "deleteOne"].map((actionKey) => (
                                <DropdownMenuItem
                                  key={actionKey}
                                  onClick={() => {
                                    openModalEvent("patch");
                                  }}
                                >
                                  {(actionData as any)[actionKey].label.en}{" "}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {localOffset > 0 || dataTableList.length > 0 ? (
                  <div className="mt-5 flex flex-row justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() =>
                              handlePageChange(Math.max(1, currentPage - 1))
                            }
                          />
                        </PaginationItem>
                        {getPageNumbers().map((page, index) => (
                          <PaginationItem key={index}>
                            {page === "..." ? (
                              <PaginationEllipsis />
                            ) : (
                              <PaginationLink
                                href="#"
                                onClick={() => handlePageChange(Number(page))}
                                isActive={currentPage === page}
                              >
                                {page}
                              </PaginationLink>
                            )}
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() =>
                              handlePageChange(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </>
      </ConfigDataTableSkeleton>
      <ConfigModalComponent
        modalTitle={props.title}
        isOpen={isModalOpen}
        closeModal={closeModalEvent}
        onClosing={handleModalSave}
        closeOnMaskClicked={true}
      >
        <ConfigCreationComponent
          exitingProcess={closeModalEvent}
          actionData={actionData}
          actionType={actionType}
        />
      </ConfigModalComponent>
    </div>
  );
};

export default ConfigDataTableComponent;
