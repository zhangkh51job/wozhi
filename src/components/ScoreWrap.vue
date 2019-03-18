<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>

    export default{
        name: 'ScoreWrap',

        mounted(){
            this.$on('enterScoreDetail', () => {
                this.$router.push({
                path: "/scoreIndex/scoreWrap/tuandaiScoreCheck"
            })
            })
        }
    }
</script>