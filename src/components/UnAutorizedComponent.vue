<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center px-6">
            <div class="mb-8">
                <h1 class="text-6xl font-bold text-red-600">401</h1>
                <h2 class="text-3xl font-semibold text-gray-700 mt-4">No Autorizado</h2>
            </div>
            <div class="mb-8">
                <p class="text-gray-600">Lo sentimos, no tienes permiso para acceder a esta página.</p>
            </div>
            <div>
                <router-link
                    :to="{name:'login'}"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Volver al inicio
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UnauthorizedComponent'
}
</script>
