// --- EVERY DATA POOL ---

// Main items currently held by the player
const inventory = [
    { named: 'Wooden Helmet', category: 'Armor', rarity: 'Common', value: '15' },
    { named: 'Ruby Sword', category: 'Weapon', rarity: 'Rare', value: '80' },
    { named: 'Diamond Sword', category: 'Weapon', rarity: 'Rare', value: '80' },
    { named: 'Healing Potion', category: 'Consumable', rarity: 'Common', value: '25' },
    { named: 'Iron Shield', category: 'Armour', rarity: 'Rare', value: '50' },
    { named: 'Copper Chestplate', category: 'Armor', rarity: 'Common', value: '25' },
    { named: 'Wooden Staff', category: 'Weapon', rarity: 'Common', value: '20' },
    { named: 'Splash Potion of Poison', category: 'Weapon', rarity: 'Rare', value: '50' }
];


// Back up items for Add Button
const hardCodedLoot =  [
    { named: 'Gold Boots', category: 'Armour', rarity: 'Common', value: '25' },
    { named: 'Wood', category: 'Fuel', rarity: 'Common', value: '5' },
    { named: 'Old Axe', category: 'Weapon', rarity: 'Common', value: '10' }
];

// Items currently in the Vault
let vaultItems = [
    { named: 'Fire Resistance Potion', category: 'Consumeable', rarity: 'Rare', value: '80' },
    { named: 'Black Diamond Leggings', category: 'Armour', rarity: 'Rare', value: '80' },
    { named: 'Extra Life', category: 'Consumeable', rarity: 'Legendary', value: '100' }
];


// --- EVENT LISTENERS ---
document.getElementById('add_item').addEventListener('click', addButton);
document.getElementById('remove_item').addEventListener('click', removeButton);
document.getElementById('merge_vault').addEventListener('click', mergeButton);
document.getElementById('mystery_box').addEventListener('click', mysteryButton);
document.getElementById('rarity_selector').addEventListener('change', buildInventory);

// --- SHORTCUTS / GLOBAL VARIABLES ---
let currentInventoryIndex = 8;
let currentLootIndex = 0;
let vaultInventoryIndex = 1;
const items = document.getElementById('html_inv');
const mergeItems = document.getElementById('vault_inv');
let fMystery = document.getElementById('feedback_mystery');
let fVault = document.getElementById('feedback_vault');
let fInv = document.getElementById('feedback_inv');

// --- ALL FUNCTIONS ---

// Draws the main inventory onto the webpage
function drawInventory () {
    items.innerHTML = '';
    
    for (let i = 0; i < inventory.length; i++) {
        items.innerHTML += `
        <li>
        ${inventory[i].named} |
        ${inventory[i].category} |
        ${inventory[i].rarity}
        </li>
        `;
}
}

// Draws a seperate vault display section
function drawVault () {
    mergeItems.innerHTML = '';
    for (let i = 0; i < vaultItems.length; i++) {
        mergeItems.innerHTML += `
        <li>
        ${vaultItems[i].named} |
        ${vaultItems[i].category} |
        ${vaultItems[i].rarity} 
        </li>
        `
    };

}


// Allows the Hard Coded Loot to be added into the inventory
function addButton () {
    if (hardCodedLoot.length > 0) {
        const pulledLoot = hardCodedLoot.shift(); 
        inventory.push(pulledLoot); 
        fInv.innerHTML = '';
    } else {
        fInv.innerHTML = 'All the Loot has been Taken!';
    }
    
    // Updates just the number inside my existing HTML sentence structure
    const numAmount = document.getElementById('numberAmount');
    if (numAmount) {
        numAmount.innerHTML = ` ${hardCodedLoot.length}`;
    }
    
    buildInventory();
} 


// Removes the items from the inventory
function removeButton() {
    if (inventory.length > 0) {
        inventory.pop();
        fInv.innerHTML = '';
        drawInventory(); // Updates the HTML list
    } else {
        fInv.innerHTML = 'You have Nothing left in your Inventory!';
    }
    buildInventory();

}

// Merges the vault Items into the Inventory
function mergeButton() {
    if (vaultItems.length > 0) {
        inventory.push(...vaultItems); 
        vaultItems = [ ]; // Empties the vault array
        fVault.innerHTML = "Vault items merged into Inventory!";
        buildInventory();
    } else {
        fVault.innerHTML = "There's nothing left in your Vault!";
    }
    buildInventory();
    
}

// STEP 2: Grab every <li> on the page and coloure it by rarity
function colourItems() {
    let cItems = document.getElementsByTagName('li');
    let invItems = inventory

    const selectedRarity = document.getElementById('rarity_selector').value;
    // a for loop that defines a start, end, and incremental value
    for (let i = 0; i < inventory.length; i++) {
        let rating = inventory[i]['rarity'];

        if (selectedRarity !== "All" && inventory[i].rarity !== selectedRarity) {
            cItems[i].style.display = 'none';
        } else {
            cItems[i].style.display = 'list-item'
        }
        if (rating == 'Legendary') {
            cItems[i].style.color = 'yellow'; //legendary
            cItems[i].style.fontWeight = 'bold'
        } else if (rating == 'Rare') {
            cItems[i].style.color = 'blue'; //rare
            cItems[i].style.fontWeight = 'bold'
        }
        else  {
            cItems[i].style.color = 'gray'; //common
            cItems[i].style.fontWeight = 'bold'

        }
    }
    document.getElementById('item-count').innerHTML = invItems.length
}


// Step 3: Loops over the array to add up the total value
function showTotal() {
    let totalValue = 0;

    // Loop through the entire collection array
    for (let i = 0; i < inventory.length; i++) {
        // FIXED: Convert the 'value' text string into a number for accurate math calculation
        totalValue += Number(inventory[i]['value']);
    }
    
    // Update the DOM element on the page with the final computed result
    document.getElementById('total-value').innerHTML = totalValue;
}


// Step 4: Mystery Box that gets items until it lands on legendary
function mysteryButton() {
let currentItem;
let randomIndex;
let loopCounter = 0;

const allLoot = [...inventory, ...vaultItems];
const hasLegendary = allLoot.some(item => Number(item.rarity) === 'Legendary');

        
    do  {
        randomIndex = Math.floor(Math.random () * allLoot.length);
        currentItem = allLoot[randomIndex];
        loopCounter++;

    } while (Number(currentItem.value) !== 100);
    
    fMystery.innerHTML = `You got the Mythic item <strong>-${currentItem.named}-</strong> in ${loopCounter} attempt(s)`;
    }


// Calls Every Function into One
function buildInventory() {
    drawInventory();
    drawVault();
    colourItems();
    showTotal();
}

buildInventory();