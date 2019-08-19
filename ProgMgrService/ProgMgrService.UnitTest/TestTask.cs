﻿using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProgMgrService;
using ProgMgrService.Controllers;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace ProgMgrService.UnitTest
{
    [TestClass]
    public class TestTask
    {
        [TestMethod]
        public void Test_Get_Pos()
        {
            tasktableController obj = new tasktableController();
            int actualCount = obj.Get4Testing(0);
            int expectedCount = 6;
           
            Assert.AreEqual(expectedCount, actualCount);
        }

        [TestMethod]
        public void Test_Get_Neg()
        {
            tasktableController obj = new tasktableController();
            int actualCount = obj.Get4Testing(0);
            int expectedCount = 7;
            //Negative Test case
            Assert.AreEqual(expectedCount, actualCount);
        }

        [TestMethod]
        public void Test_Post_Pos()
        {

            tasktableController obj = new tasktableController();
            bool actualRes = obj.Post4Testing(0);
            bool expectedRes = true;
            Assert.AreEqual(expectedRes, actualRes);
        }

        [TestMethod]
        public void Test_Put_Pos()
        {
            tasktableController obj = new tasktableController();
            bool actualRes = obj.Put4Testing(0);
            bool expectedRes = true;
            Assert.AreEqual(expectedRes, actualRes);
        }

    }
}
