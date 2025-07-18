<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

defineProps<{
    icon?: DefaultTheme.FeatureIcon
    title: string
    details?: string
    link?: string
    linkText?: string
    rel?: string
    target?: string
    updatedTime?: string
    fileTimeInfo?: number
}>()
</script>

<template>
    <VPLink class="VPFeature" :href="link" :rel :target :no-icon="true" :tag="link ? 'a' : 'div'">
        <article class="box">
            <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
                <VPImage :image="icon" :alt="icon.alt" :height="icon.height || 48" :width="icon.width || 48" />
            </div>
            <VPImage v-else-if="typeof icon === 'object'" :image="icon" :alt="icon.alt" :height="icon.height || 48"
                :width="icon.width || 48" />
            <div v-else-if="icon" class="icon" v-html="icon"></div>
            <h2 class="title" v-html="title"></h2>
            <p v-if="details" class="details" v-html="details"></p>

            <div v-if="linkText" class="link-text">
                <p class="link-text-value">
                    {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
                </p>
            </div>

            <div class="updated-time">
                {{ updatedTime }}前更新
            </div>
        </article>
    </VPLink>
</template>

<style scoped>
.updated-time {
    font-size: 13px;
    color: #59636e;
    text-align: right;
}

.VPFeature {
    display: block;
    border: 1px solid var(--vp-c-bg-soft);
    border-radius: 12px;
    height: 100%;
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.25s, background-color 0.25s;
}

.VPFeature.link:hover {
    border-color: var(--vp-c-brand-1);
}

.box {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 100%;
}

.box> :deep(.VPImage) {
    margin-bottom: 20px;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 6px;
    background-color: var(--vp-c-default-soft);
    width: 48px;
    height: 48px;
    font-size: 24px;
    transition: background-color 0.25s;
}

.title {
    line-height: 24px;
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    border: none;
    padding: 0;
}

.details {
    flex-grow: 1;
    padding-top: 8px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}

.link-text {
    padding-top: 8px;
}

.link-text-value {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
}

.link-text-icon {
    margin-left: 6px;
}

a {
    text-decoration: none;
}
</style>
