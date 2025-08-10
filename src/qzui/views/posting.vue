<template>
    <div class="posting-container">
        <div class="posting-uploader">
            <el-upload v-model:file-list="fileList" :action="actionUrl" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-success="handleRealAvatarSuccess" :data="uploadData"
                :before-upload="beforeAvatarUpload">
                <el-icon>
                    <Plus />
                </el-icon>

                <template #file="{ file }">
                    <div class="video-preview-container">
                        <div class="video-preview-delete">
                            <el-icon :size="20" @click="deleteFile(file)">
                                <Delete color="#fff" />
                            </el-icon>
                        </div>
                        <video v-if="file.response?.data?.format == 'mp4'" controls :src="file.response?.data?.uri"
                            style="width: 76px; height: 76px;"></video>
                        <img v-else :src="file.response?.data?.uri" style="width: 76px; height: 76px;"
                            class="delete-icon" />
                        <!-- <video controls :src="file.url" style="width: 100%; height: 100%; object-fit: cover"></video> -->
                    </div>
                </template>
            </el-upload>
        </div>
        <div class="posting-content">
            <textarea v-model="params.content" class="posting-area" placeholder="分享思考和感悟，收获更多粉丝" />
        </div>
        <ul class="posting-bottom">
            <li @click="drawer = true">
                <div>谁可以看</div>
                <div>
                    {{
                        params.visibilityType == '0' ? '所有圈友' :
                            params.visibilityType == '1' ? '仅陌生人可见' :
                                params.visibilityType == '2' ? '关注我的圈友' :
                                    params.visibilityType == '3' ? '我关注的圈友' : ''
                    }}
                    <el-icon color="#999">
                        <ArrowRight />
                    </el-icon>
                </div>
            </li>

            <li>
                <div>是否入圈推送</div>
                <el-radio-group v-model="params.isPush">
                    <el-radio value="0"><span>否</span></el-radio>
                    <el-radio value="1"><span>是</span></el-radio>
                </el-radio-group>
            </li>

            <li>
                <div>是否置顶</div>
                <el-radio-group v-model="params.isTop">
                    <el-radio value="0"><span>否</span></el-radio>
                    <el-radio value="1"><span>是</span></el-radio>
                </el-radio-group>
            </li>
            <!-- <li @click="drawer2 = true">
        <div>
          <el-icon>
            <View />
          </el-icon>对谁可见
        </div>
        <el-icon color="#999">
          <ArrowRight />
        </el-icon>
      </li> -->
        </ul>

        <div class="posting-btn">
            <span @click="handlePublish">发布</span>
        </div>

        <!--谁可以看-->
        <el-drawer v-model="drawer" title="谁可以看" direction="btt" size="60%">
            <div class="drawer-content">
                <el-radio-group v-model="params.visibilityType">
                    <el-radio value="0"><span>所有圈友</span><i>对所有圈友可见</i></el-radio>
                    <el-radio value="2"><span>关注我的圈友</span><i>仅对已关注我的圈友可见</i></el-radio>
                    <el-radio value="3"><span>我关注的圈友</span><i>仅对我关注的圈友可见</i></el-radio>
                    <el-radio value="1"><span>仅陌生人可见</span><i>对完全没有互关关系的人可见</i></el-radio>
                </el-radio-group>
                <div class="drawer-button" @click="drawer = false">确定</div>
            </div>
        </el-drawer>

        <!--对谁可见-->
        <el-drawer v-model="drawer2" title="对谁可见" direction="btt" size="60%">
            <div class="drawer-container">
                <ul>
                    <li v-for="item in allFriends" :key="item.id" @click="selectLi(item.id)"
                        :class="{ active: params.selected.includes(item.id) }">
                        <i></i>
                        <img :src="item.url" alt="" />
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
                <div class="drawer-button" @click="drawer2 = false">确定 ({{ params.selected.length }}/{{
                    allFriends.length }})
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getItem } from '@/ui/util/storageHelper'
import { ipcRenderer } from 'electron'
import { closeNewWindow } from '@/platformHelper'
import Config from "@/config";
import { publishDynamic } from '@/api/community'
import emitter from '@/utils/eventBus'
import { ArrowRight, User, Plus, Delete } from '@element-plus/icons-vue'
const drawer = ref(false)
const drawer2 = ref(false)
import img1 from '@/assets/images/img-preview.png'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
let userId = getItem('userPortrait') ? getItem('userPortrait') : ''
let actionUrl = `${Config.APP_SERVER}/api/upload/fileAdd`
let uploadData = {
    sourceId: userId,
    type: 10 // 10:图片 20:视频
}
const fileList = ref([])
const params = reactive({
    userId,
    communityId: '',
    content: '',
    isPush: '0', // 是否推送0:否 1:是
    isTop: '0', // 是否置顶0:否 1:是
    visibilityType: '0',
    mediaResourcesList: []
})
const allFriends = ref([])
const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}
const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
const selectLi = (id) => {
    const index = params.selected.indexOf(id)
    if (index == -1) {
        params.selected.push(id)
    } else {
        params.selected.splice(index, 1)
    }
}

const handleRealAvatarSuccess = async (response, uploadFile) => {
    console.log(response, uploadFile)
    if (response.code == 0) {
        const { uri, name } = response.data
        console.log(fileList.value, 'fileList')
    }
    console.log(URL.createObjectURL(uploadFile.raw))
}

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png' && rawFile.type !== 'video/mp4') {
        ElMessage.error('上传的必须是JPG,JPEG,PNG的图片格式或者MP4格式!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('上传的图片或者视频不能超过2MB!')
        return false
    }

    if (rawFile.type == 'video/mp4') {
        uploadData.type = 20
    } else if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/jpg' || rawFile.type == 'image/png') {
        uploadData.type = 10
    }
    return true
}

const handlePublish = () => {
    // 校验是否上传了图片或者视频
    if (fileList.value.length == 0) {
        ElMessage.error('请选择要上传的文件!')
        return false
    }
    // 校验是否填写了内容
    if (params.content.replace(/\s/g, '').length == 0) {
        ElMessage.error('请填写内容!')
        return false
    }

    params.mediaResourcesList = []
    fileList.value.forEach((item) => {
        params.mediaResourcesList.push({
            mediaType: item.response?.data?.type == 10 ? 'image' : 'video',
            fileUrl: item.response?.data?.uri,
        })
    })
    publishDynamic(params).then((res) => {
        if (res.code == 0) {
            ElMessage.success('发布成功!')
            const communityId = getItem(getItem('communityId') || '')
            emitter.emit('changeCommunityId', communityId)
            params.userId = userId
            params.communityId = communityId
            params.content = ''
            params.isPush = '0'
            params.isTop = '0'
            params.visibilityType = '0'
            params.mediaResourcesList = []
            fileList.value = []
        } else {
            ElMessage.error(res.msg)
        }
    })



}

const deleteFile = (file) => {
    const uid = file.uid
    fileList.value = fileList.value.filter(item => item.uid !== uid)
}




onMounted(() => {
    params.communityId = getItem('communityId') || '0'

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log("定位成功", position)
        }, (err) => {
            console.error("定位失败:", err.message);
        })

    } else {
        console.error("您的浏览器不支持定位功能");
    }
})
</script>

<style lang="scss" scoped>
.posting-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    padding: 40px 16px;
    box-sizing: border-box;

    :deep(.el-upload--picture-card) {
        width: 78px;
        height: 78px;
    }

    :deep(.el-upload-list--picture-card .el-upload-list__item) {
        width: 78px;
        height: 78px;
    }

    .posting-uploader {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }

    .posting-content {
        width: 100%;
        margin: 20px 0;
    }

    .posting-area {
        height: 200px;
        width: 100%;
        outline: none;
        border: 1px solid #eee;
        padding: 10px;
        resize: none;
        box-sizing: border-box;

        &::placeholder {
            font-size: 14px;
            color: #aaa;
        }
    }

    .posting-bottom {
        width: 100%;
        padding: 0;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 45px;
            border-bottom: 1px solid #eee;
            cursor: pointer;
            padding: 0 16px;

            &>div {
                display: flex;
                align-items: center;
                color: #333;
                font-size: 14px;
            }
        }
    }

    :deep(.el-drawer__header) {
        margin-bottom: 16px;
    }

    .drawer-content {
        position: relative;
        width: 100%;
        height: 100%;

        :deep(.el-radio-group) {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
        }

        :deep(.el-radio) {
            width: 100%;
        }

        :deep(.el-radio__label) {
            font-size: 14px;
            flex: 1;
            display: flex;
            justify-content: space-between;

            span {
                color: #333;
            }

            i {
                font-style: normal;
                color: #777;
                font-size: 14px;
            }
        }
    }

    .drawer-container {
        position: relative;
        overflow: hidden;
        height: 100%;

        ul {
            width: calc(100vw - 15px);
            padding: 0;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 7px;
            height: 260px;
            overflow-y: scroll;
            padding-right: 10px;

            li {
                position: relative;
                cursor: pointer;

                span {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 25px;
                    line-height: 25px;
                    display: block;
                    font-size: 12px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    background-color: rgba(0, 0, 0, 0.65);
                    color: #fff;
                    padding: 0 5px;
                    box-sizing: border-box;
                }

                i {
                    position: absolute;
                    right: 3px;
                    top: 3px;
                    display: flex;
                    width: 14px;
                    height: 14px;
                    background-image: url('../../assets/images/check.png');
                    background-position: right top;
                    background-size: 14px 14px;
                    background-repeat: no-repeat;
                    z-index: 100;
                }

                &.active {
                    i {
                        background-image: url('../../assets/images/check_fill.png');
                    }
                }

                img {
                    width: 100%;
                    display: flex;
                }
            }
        }
    }

    .posting-btn {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        padding: 16px;

        span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 35px;
            background-color: #5E97FF;
            color: #fff;
            font-size: 14px;
            border-radius: 8px;
            cursor: pointer;
        }
    }

    .drawer-button {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 35px;
        background-color: #5E97FF;
        color: #fff;
        font-size: 14px;
        border-radius: 8px;
        cursor: pointer;
    }
}

.video-preview-container {
    position: relative;
    width: 78px;
    height: 78px;

    .video-preview-delete {
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.65);
        z-index: 99;

        i {
            cursor: pointer;
        }
    }

    &:hover {
        .video-preview-delete {
            display: flex;
        }
    }
}
</style>
