<template>
    <section>
        main
    </section>
</template>

<script>

    export default {
        methods: {

            // logout for other page
            logout: function () {
                sessionStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                localStorage.removeItem('expired_at');
                this.$router.push('/login');
            },

            verify() {
                let token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push({path: '/login'});
                } else {
                    let expired_at = localStorage.getItem('expired_at');
                    let expired_date = new Date(expired_at);
                    let now_date = new Date();
                    if (now_date > expired_date) {
                        this.$router.push({path: '/login'});
                        this.logout();
                    } else {
                        this.$router.push({path: '/main'});

                    }

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
