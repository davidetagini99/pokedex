import React from "react";
import ButtonAppBar from "../componenti/HomeAppBar";
import GenerationsList from "../componenti/GenerationsList";

export default function Home() {
    return (
        <div>
            <ButtonAppBar />
            <GenerationsList />
        </div>
    );
}