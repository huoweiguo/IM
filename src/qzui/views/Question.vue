<template>
  <div class="test-page">
    <TopNav title="问题测试" />

    <!-- 三级联动选择器 -->
    <div class="cascade-selector">
      <!-- 省份选择 -->
      <div class="select-group">
        <select v-model="selectedProvince" @change="handleProvinceChange">
          <option value="">请选择省份</option>
          <option v-for="province in provinces" :key="province.code" :value="province.code">
            {{ province.name }}
          </option>
        </select>
      </div>

      <!-- 城市选择 -->
      <div class="select-group">
        <select v-model="selectedCity" @change="handleCityChange" :disabled="!selectedProvince">
          <option value="">请选择城市</option>
          <option v-for="city in cities" :key="city.code" :value="city.code">
            {{ city.name }}
          </option>
        </select>
      </div>

      <!-- 区县选择 -->
      <div class="select-group">
        <select v-model="selectedDistrict" :disabled="!selectedCity">
          <option value="">请选择区县</option>
          <option v-for="district in districts" :key="district.code" :value="district.code">
            {{ district.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- 结果显示网格 -->
    <div class="result-grid">
      <div class="grid-item" v-for="n in 9" :key="n">
        {{ displayValue }}
      </div>
    </div>

    <!-- 测试按钮 -->
    <button class="test-btn" @click="runTest">测试1</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TopNav from '../components/TopNav.vue'

// 模拟省市区数据
const provinceData = [
  {
    code: 'A1', name: '北京市', children: [
      {
        code: 'A2', name: '北京市', children: [
          { code: 'A3', name: '东城区' },
          { code: 'B3', name: '西城区' },
          { code: 'C3', name: '朝阳区' }
        ]
      }
    ]
  },
  {
    code: 'B1', name: '上海市', children: [
      {
        code: 'B2', name: '上海市', children: [
          { code: 'D3', name: '黄浦区' },
          { code: 'E3', name: '徐汇区' },
          { code: 'F3', name: '长宁区' }
        ]
      }
    ]
  },
  {
    code: 'C1', name: '广东省', children: [
      {
        code: 'C2', name: '广州市', children: [
          { code: 'G3', name: '天河区' },
          { code: 'H3', name: '越秀区' },
          { code: 'I3', name: '海珠区' }
        ]
      },
      {
        code: 'D2', name: '深圳市', children: [
          { code: 'J3', name: '福田区' },
          { code: 'K3', name: '南山区' },
          { code: 'L3', name: '罗湖区' }
        ]
      }
    ]
  }
]

// 数据引用
const provinces = ref(provinceData)
const cities = ref([])
const districts = ref([])

// 选中的值
const selectedProvince = ref('')
const selectedCity = ref('')
const selectedDistrict = ref('')

// 显示的值
const displayValue = computed(() => {
  if (selectedDistrict.value) {
    return districts.value.find(d => d.code === selectedDistrict.value)?.code || 'A1'
  }
  if (selectedCity.value) {
    return cities.value.find(c => c.code === selectedCity.value)?.code || 'A1'
  }
  if (selectedProvince.value) {
    return provinces.value.find(p => p.code === selectedProvince.value)?.code || 'A1'
  }
  return 'A1'
})

// 选择省份
const handleProvinceChange = () => {
  selectedCity.value = ''
  selectedDistrict.value = ''

  if (selectedProvince.value) {
    const province = provinces.value.find(p => p.code === selectedProvince.value)
    cities.value = province?.children || []
  } else {
    cities.value = []
  }
  districts.value = []
}

// 选择城市
const handleCityChange = () => {
  selectedDistrict.value = ''

  if (selectedCity.value) {
    const city = cities.value.find(c => c.code === selectedCity.value)
    districts.value = city?.children || []
  } else {
    districts.value = []
  }
}

// 运行测试
const runTest = () => {
  const result = {
    province: selectedProvince.value,
    city: selectedCity.value,
    district: selectedDistrict.value,
    display: displayValue.value
  }
  console.log('测试结果:', result)
  alert(`测试完成!\n当前选择: ${displayValue.value}`)
}
</script>

<style scoped>
.test-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  padding-top: 60px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cascade-selector {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.select-group {
  flex: 1;
}

.select-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
}

.select-group select:disabled {
  background-color: #f5f5f5;
  color: #999;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 30px;
}

.grid-item {
  padding: 30px 0;
  background-color: white;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.test-btn {
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  padding: 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.test-btn:hover {
  background-color: #40a9ff;
}
</style>
