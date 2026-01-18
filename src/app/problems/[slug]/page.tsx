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
