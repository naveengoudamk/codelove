import styles from "./page.module.css";
import Workspace from "@/components/Workspace";

// Mock data
const problemsMap: Record<string, any> = {
    "two-sum": {
        title: "1. Two Sum",
        difficulty: "Easy",
        description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers* such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`
`,
        defaultCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`,
            python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
            cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`
        }
    },
    "valid-parentheses": {
        title: "20. Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        defaultCode: {
            javascript: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
            python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        ",
            java: "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
        }
    },
    "merge-two-sorted-lists": {
        title: "21. Merge Two Sorted Lists",
        difficulty: "Easy",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
        defaultCode: {
            javascript: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};",
            python: "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        ",
            java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};"
        }
    },
    "maximum-subarray": {
        title: "53. Maximum Subarray",
        difficulty: "Medium",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        defaultCode: {
            javascript: "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};",
            python: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ",
            java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};"
        }
    },
    "climbing-stairs": {
        title: "70. Climbing Stairs",
        difficulty: "Easy",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        defaultCode: {
            javascript: "/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    \n};",
            python: "class Solution:\n    def climbStairs(self, n: int) -> int:\n        ",
            java: "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};"
        }
    },
    "best-time-to-buy-and-sell-stock": {
        title: "121. Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        defaultCode: {
            javascript: "/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};",
            python: "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        ",
            java: "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};"
        }
    },
    "reverse-linked-list": {
        title: "206. Reverse Linked List",
        difficulty: "Easy",
        description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
        defaultCode: {
            javascript: "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    \n};",
            python: "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        ",
            java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}",
            cpp: "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};"
        }
    },
    // Add a default for others for demo purposes, usually we'd fetch or error
    "default": {
        title: "Demo Problem",
        difficulty: "Medium",
        description: "This is a demo problem to showcase the workspace.",
        defaultCode: {
            javascript: "// Write your code here",
            python: "# Write your code here",
            java: "// Write your code here",
            cpp: "// Write your code here"
        }
    }
};

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const problem = problemsMap[slug] || problemsMap["default"];

    return <Workspace problem={problem} />;
}
