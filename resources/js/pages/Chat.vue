<template>

    <div class="flex w-[calc(100vw-305px)]">
        <div class="h-screen bg-neutral-950 w-5/6">
            <div class="px-5 py-6 border-b-[1px] border-[#7a7777]">
                <div class="flex gap-2 items-center">
                    <div>
                        <h1 class="text-2xl font-bold text-white">Message</h1>
                    </div>
                </div>
            </div>
            <div class="flex  gap-2 items-center">
                <div class="h-[calc(100vh-100px)] w-full flex flex-col justify-end">
                    <div class="py-5 px-10 w-full h-screen overflow-y-auto">
                        <div class="flex items-end flex-col w-full">
                            <div class="border rounded-xl leading-relaxed">
                                <div class="px-5 py-2">
                                    <h1>Salom</h1>
                                </div>
                            </div>
                            <p class="text-[11px] mt-1">12:11</p>
                        </div>
                        <div class="flex items-start  flex-col w-full">
                            <div class="flex gap-3">
                                <div class="bg-white w-fit h-fit px-3 font-mono font-semibold text-lg py-2 rounded-full">Dn</div>
                                <div class="border rounded-xl bg-white leading-relaxed">
                                    <div class="px-5 py-2 text-black">
                                        <h1>Salom</h1>
                                    </div>
                                </div>
                            </div>
                            <p class="text-[11px] mt-1">12:11</p>
                        </div>
                    </div>
                    <div class="px-5 py-3 w-full">
                        <form method="post" class="flex items-center">
                            <input type="text"
                                class="border bg-transparent rounded-xl w-full px-3 py-3 text-white placeholder:text-slate-400"
                                placeholder="write any message">
                            <svg data-slot="icon" fill="none" class="w-8 h-8 mx-5 cursor-pointer " stroke-width="1.5"
                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5">
                                </path>
                            </svg>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-screen border-l-[1px] border-[#7a7777] bg-neutral-950 w-2/6">
            <div class="px-5 py-6 border-b-[1px] border-[#7a7777]">
                <div class="flex gap-2 items-center justify-between cursor-pointer">
                    <h3 class="text-2xl font-bold text-white">All Message</h3>
                    <svg data-slot="icon" fill="none" class="w-6 h-6" stroke-width="1.5" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="px-5 py-3 border-[1px] border-[#7a7777] border-x-0 -mt-[1px]">
                <div class="flex gap-2 items-center cursor-pointer">
                    <div class="bg-white w-fit h-fit px-3 font-mono font-semibold text-lg py-2 rounded-full">Dn</div>
                    <div>
                        <h1 class="text-2xl font-bold text-white">salom</h1>
                        <p>messafe</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>
