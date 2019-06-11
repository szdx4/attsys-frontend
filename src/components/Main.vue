<template>
    <section>
        main
    </section>
</template>

<script>
    export default {
        methods: {
            verify() {
                let token = localStorage.getItem('token');
                console.log(token);
                if (!token ) {
                    this.$router.push({path: '/login'});
                }

            },

        },
        mounted() {
            this.verify();
        }


    }

</script>

<style scoped>

</style>
