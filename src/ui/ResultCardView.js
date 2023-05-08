import React, { useState } from "react";
import loadingIcon from '../res/dancing-mushroom.gif'
import { Hearts } from  'react-loader-spinner'
import { Card, Image, Text, Badge, Button, Group, Skeleton, Pagination } from '@mantine/core';



const ResultCardView = ({ loading, isSuccess, results, handleClickTerm, activePage, setPage }) => {

    if (loading)
        return <div>
            {/* <Hearts 
                height="80"
                width="80"
                color="red"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /> */}
            <div className="flex justify-center">
                <img src={loadingIcon} width="500"/>
            </div>
            <div className="mx-40">
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>

            </div>
            
        </div>

    if (isSuccess != null && !isSuccess) 
        return <>Error</>

    if (isSuccess == null) 
        return <>Search for result</>

    return <>
        <p className="flex text-zinc-400 mb-6">Page {activePage} of about {results.totalResults} result{results.webPages.length > 1 ? 's' : ''} ({results.retrievalTimeInSe.toFixed(2)} seconds) </p>
        <div className="flex flex-col items-center">
            {results.webPages.map((page,j) => {
                return <div key={`result-${j}`}>
                    <Card shadow="sm" padding="lg" radius="md" mb={14} w={"40rem"} withBorder>

                        <Group position="apart">
                            <a className="text-lg text-blue-600 hover:underline" href={page.url}>{page.title}</a>
                            <Badge color="yellow" variant="filled">
                                {page.similarity}
                            </Badge>
                        </Group>

                        <p className="text-md text-green-600" href={page.url}>
                            {page.url}
                        </p>
                        <p className=" text-zinc-500">
                            {page.lastModificationDate}, {page.pageSize}
                        </p>

                        {Object.entries(page.termFreqMap).sort((a, b) => b[1] - a[1]).map(k => <span key={`stem-${k[0]}`}>
                            {k[1] > 10 ? <>
                                <Badge className="hover:cursor-pointer hover:shadow-md" variant="gradient" radius="sm" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} pr={3} mr={3} rightSection={freq(k[1])}
                                    onClick={() => handleClickTerm(k[0])}
                                >
                                    <p className="lowercase">{k[0]}</p>
                                </Badge>
                            </> : k[1] > 5 ? <>
                                <Badge className="hover:cursor-pointer hover:shadow" color="green" radius="sm"  pr={3} mr={3} variant="outline" rightSection={freq(k[1])}
                                    onClick={() => handleClickTerm(k[0])}
                                >
                                    <p className="lowercase">{k[0]}</p>
                                </Badge>
                            </> : <>
                                <Badge className="hover:cursor-pointer hover:shadow" color="cyan" radius="sm"  pr={3} mr={3} variant="outline" rightSection={freq(k[1])}
                                    onClick={() => handleClickTerm(k[0])}
                                >
                                    <p className="lowercase">{k[0]}</p>
                                </Badge>
                            </>}
                            
                        </span>)}
                        

                        <h4 className=" text-zinc-500 mt-6">
                            Child Links:
                        </h4>
                        <LinkList links={page.childLinks} />
                        

                        <h4 className=" text-zinc-500 mt-6">
                            Parent Links:
                        </h4>
                        <LinkList links={page.parentLinks} />

                        <button className="bg-gray-400 hover:bg-gray-600 text-white text-xs font-bold py-2 px-4 mt-6 rounded-full">
                            See more {">"}
                        </button>

                    </Card>
                </div>
            })}

        </div>
        <div className="flex justify-center">
            <Pagination total={Math.ceil(results.totalResults/50)} value={activePage} onChange={setPage} />
        </div>
    </>
    
    
}



const freq = (v) => {
    return <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-medium text-gray-500 bg-blue-50 rounded">
        {v}
    </span>
}

const LinkList = ({ links }) => {
    const [showCount, setShowCount] = useState(10);

    const handleViewMoreLinks = () => {
        setShowCount(showCount + 10);
    };
    
    const handleHideLinks = () => {
        setShowCount(10);
    };
    
    return <>
        <div className="flex flex-col">
            {links.slice(0, showCount).map((link, i) => 
                <a 
                    key={`child-${i}`} 
                    className="font-medium text-blue-600 hover:underline w-fit" 
                    href={link}
                >
                    {link}
                </a>
            )}
            {showCount < links.length && 
                <div className="flex justify-between">
                    <button 
                        className="flex justify-start w-fit font-medium text-zinc-400 italic underline" 
                        onClick={handleViewMoreLinks}
                    >
                            ... View more links ({links.length - showCount}+)
                    </button>
                    {showCount > 10 && 
                        <button 
                            className="flex justify-start w-fit font-medium text-zinc-400 italic underline" 
                            onClick={handleHideLinks}
                        >
                            ... Hide links
                        </button>
                    }
                </div>
            }
        </div>
    </>
}

const CardSkeleton = () => {
    return <>
        <div className="my-4 px-4 py-10 mx-6 border border-solid border-slate-200 rounded-md">
            {/* <Skeleton height={50} circle mb="xl" /> */}
            <Skeleton height={10} width="70%" radius="xl" />
            <Skeleton height={10} mt={10} width="70%" radius="xl" />
            <Skeleton height={10} mt={10} width="30%" radius="xl" />
            <Skeleton height={10} mt={10} width="70%" radius="xl" />
            <Skeleton height={10} mt={10} width="30%" radius="xl" />
            <Skeleton height={10} mt={10} width="30%" radius="xl" />
            <Skeleton height={10} mt={10} width="10%" radius="xl" />
        </div>
    </>
}



export default ResultCardView;