<template>
    <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div class="flex-1">
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-1 bg-blue-200 p-4 rounded">
                    Small Card 1
                </div>
                <div class="col-span-1 bg-blue-200 p-4 rounded">
                    Small Card 2
                </div>
                <div class="col-span-1 bg-blue-200 p-4 rounded">
                    Small Card 3
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardCollection',
}
</script>