// 獲取 DOM 元素
const mathInput = document.getElementById('mathGrade');
const englishInput = document.getElementById('englishGrade');
const submitBtn = document.getElementById('submitBtn'); // 2. Submit 按鈕
const gradeBody = document.getElementById('gradeBody');
const avgMathDisplay = document.getElementById('avgMath');
const avgEnglishDisplay = document.getElementById('avgEnglish');
const avgOverallDisplay = document.getElementById('avgOverall');

/**
 * 4 & 5. 核心邏輯：計算並更新所有平均值
 */
function updateAverages() {
    // 獲取所有成績單元格
    const mathCells = document.querySelectorAll('#gradeBody .math-col');
    const englishCells = document.querySelectorAll('#gradeBody .english-col');
    const averageCells = document.querySelectorAll('#gradeBody .average-col');
    
    const rowCount = mathCells.length;
    let totalMathSum = 0;
    let totalEnglishSum = 0;
    let totalOverallSum = 0;

    // 重新計算所有行的平均值 (雖然新的行已經計算過，但重新計算可確保所有數據一致)
    for (let i = 0; i < rowCount; i++) {
        // 確保單元格內容是數字
        const mathScore = parseFloat(mathCells[i].textContent) || 0;
        const englishScore = parseFloat(englishCells[i].textContent) || 0;

        // 4. 計算並顯示每行平均
        const rowAverage = (mathScore + englishScore) / 2;
        averageCells[i].textContent = rowAverage.toFixed(2);

        // 累加總和
        totalMathSum += mathScore;
        totalEnglishSum += englishScore;
        totalOverallSum += rowAverage;
    }

    // 5. 動態計算並顯示列平均和總平均
    if (rowCount > 0) {
        // 5. 顯示列平均 (Math and English)
        avgMathDisplay.textContent = (totalMathSum / rowCount).toFixed(2);
        avgEnglishDisplay.textContent = (totalEnglishSum / rowCount).toFixed(2);
        
        // 5. 顯示總平均
        avgOverallDisplay.textContent = (totalOverallSum / rowCount).toFixed(2);
    } else {
        // 如果沒有數據，顯示 0.00
        avgMathDisplay.textContent = '0.00';
        avgEnglishDisplay.textContent = '0.00';
        avgOverallDisplay.textContent = '0.00';
    }
}

/**
 * 2, 4. 提交按鈕點擊事件處理函數
 */
// 2. 綁定事件監聽器 
submitBtn.addEventListener("click", function () {
    const mathGrade = parseFloat(mathInput.value);
    const englishGrade = parseFloat(englishInput.value);

    // 驗證輸入
    if (isNaN(mathGrade) || isNaN(englishGrade) || mathGrade < 0 || englishGrade < 0) {
        alert('Please enter valid, non-negative numbers for both Math and English grades.');
        return;
    }

    // 獲取當前行數 (作為新的編號)
    const newRowNumber = gradeBody.rows.length + 1;
    
    // 1. 計算新行的平均值
    const newAverage = (mathGrade + englishGrade) / 2;

    // 4. 添加新行到表格
    const newRow = gradeBody.insertRow();
    
    // 創建並設置單元格
    newRow.insertCell().textContent = newRowNumber; // #
    newRow.insertCell().textContent = mathGrade.toFixed(0); // Math
    newRow.cells[1].classList.add('math-col');
    
    newRow.insertCell().textContent = englishGrade.toFixed(0); // English
    newRow.cells[2].classList.add('english-col');
    
    // 4. 計算並顯示該行平均
    newRow.insertCell().textContent = newAverage.toFixed(2); // Average
    newRow.cells[3].classList.add('average-col');
    
    // 5. 更新所有平均值
    updateAverages(); // 呼叫更新平均值的函數 [cite: 23]

    // 清空輸入框
    mathInput.value = '';
    englishInput.value = '';
});

// 初始化時計算一次平均值 (處理預設的 3 行數據)
// 因為 updateAverages() 函式是負責 5. 動態計算並顯示列平均和總平均，
// 所以在頁面載入時需執行一次 [cite: 15, 16]。
updateAverages();